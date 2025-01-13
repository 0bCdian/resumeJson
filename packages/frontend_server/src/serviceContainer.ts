import { FireStoreApiKeyRepository } from "@json_cv_api/modules/src/Auth/Infrastructure/FireStoreApiKeyRepository";
import { FireStoreUserRepository } from "@json_cv_api/modules/src/User/Infrastructure/FireStoreUserRepository";
import { ApiKeyCreate } from "@json_cv_api/modules/src/Auth/Application/ApiKeyCreate";
import { ApiKeyDelete } from "@json_cv_api/modules/src/Auth/Application/ApiKeyDelete";
import { ApiKeyGetAll } from "@json_cv_api/modules/src/Auth/Application/ApiKeyGetAll";
import { UserCreate } from "@json_cv_api/modules/src/User/Application/UserCreate";
import { UserDelete } from "@json_cv_api/modules/src/User/Application/UserDelete";
import { UserGet } from "@json_cv_api/modules/src/User/Application/UserGet";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { CONFIG } from "./config/projectConfig";
import { getAuth } from "firebase-admin/auth";
import { initializeFirestore } from "firebase-admin/firestore";
const app = initializeApp({
	credential: applicationDefault(),
	projectId: CONFIG.projectID,
});
console.log(CONFIG);
console.log(process.env);
const firebaseInstance = initializeFirestore(app);
if (CONFIG.env === "production") {
	firebaseInstance.settings({ databaseId: CONFIG.dbID });
}
const auth = getAuth();
const apiKeyRepository = new FireStoreApiKeyRepository(firebaseInstance);
const userRepository = new FireStoreUserRepository(firebaseInstance);

export const ServiceContainer = {
	api: {
		create: new ApiKeyCreate(apiKeyRepository),
		delete: new ApiKeyDelete(apiKeyRepository),
		getAll: new ApiKeyGetAll(apiKeyRepository),
	},
	user: {
		create: new UserCreate(
			userRepository,
			CONFIG.userDefaultApiCalls,
			CONFIG.maxTokensPerRequest,
		),
		delete: new UserDelete(userRepository),
		get: new UserGet(userRepository),
	},
	auth,
};
