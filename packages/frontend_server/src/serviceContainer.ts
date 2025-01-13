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
import { type Firestore, initializeFirestore } from "firebase-admin/firestore";
const app = initializeApp({
	credential: applicationDefault(),
	projectId: CONFIG.projectID,
});
// We have to do this abomination because there's a bug in bun's grpc
// implementation https://github.com/firebase/firebase-admin-node/issues/2744
let fireStoreInstance: Firestore;
if (CONFIG.env === "production") {
	fireStoreInstance = initializeFirestore(app, { preferRest: true });
	fireStoreInstance.settings({
		databaseId: CONFIG.dbID,
	});
} else {
	fireStoreInstance = initializeFirestore(app);
}
const auth = getAuth(app);
const apiKeyRepository = new FireStoreApiKeyRepository(fireStoreInstance);
const userRepository = new FireStoreUserRepository(fireStoreInstance);

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
