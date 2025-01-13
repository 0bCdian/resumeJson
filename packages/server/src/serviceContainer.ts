import { applicationDefault, initializeApp } from "firebase-admin/app";
import { FireStoreJobRepository } from "@json_cv_api/modules/src/Job/Infrastructure/FireStoreJobRepository";
import { FireStoreApiKeyRepository } from "@json_cv_api/modules/src/Auth/Infrastructure/FireStoreApiKeyRepository";
import { FireStoreUserRepository } from "@json_cv_api/modules/src/User/Infrastructure/FireStoreUserRepository";
import { TokenizerService } from "@json_cv_api/modules/src/Shared/Infrastructure/TokenizerService";
import { TextParserService } from "@json_cv_api/modules/src/Shared/Infrastructure/TextParserService";
import { PDFParserService } from "@json_cv_api/modules/src/Shared/Infrastructure/PDFParserService";
import { FireStoreResumeRepository } from "@json_cv_api/modules/src/Resume/Infrastructure/FireStoreResumeRepository";
import { OpenAIResumeRepository } from "@json_cv_api/modules/src/Resume/Infrastructure/LlmRepository/OpenAIResumeRepository";
import { JobUpdate } from "@json_cv_api/modules/src/Job/Application/JobUpdate";
import { JobCreate } from "@json_cv_api/modules/src/Job/Application/JobCreate";
import { JobGet } from "@json_cv_api/modules/src/Job/Application/JobGet";
import { ResumeCreate } from "@json_cv_api/modules/src/Resume/Application/ResumeCreate";
import { ResumeGet } from "@json_cv_api/modules/src/Resume/Application/ResumeGet";
import { ApiKeyValidate } from "@json_cv_api/modules/src/Auth/Application/ApiKeyValidate";
import { UserUpdateQuota } from "@json_cv_api/modules/src/User/Application/UserUpdateQuota";
import { CONFIG } from "./config/projectConfig";
import { initializeFirestore } from "firebase-admin/firestore";

const app = initializeApp({
	credential: applicationDefault(),
	projectId: CONFIG.projectID,
});
console.log(app.options.projectId);
console.log(app.options.storageBucket);
console.log(app.options.serviceAccountId);
console.log(app.options.databaseURL);
const firebaseInstance = initializeFirestore(app);
if (CONFIG.env === "production") {
	firebaseInstance.settings({
		databaseId: CONFIG.dbID,
	});
}
console.log(firebaseInstance.databaseId);
const apiKeyRepository = new FireStoreApiKeyRepository(firebaseInstance);
const userRepository = new FireStoreUserRepository(firebaseInstance);
const tokenizer = new TokenizerService();
const resumeRepository = new FireStoreResumeRepository(
	firebaseInstance,
	CONFIG.timeToExpireCache,
);
const llmResumeRepository = new OpenAIResumeRepository(CONFIG.openAIApiKey);
const jobRepository = new FireStoreJobRepository(
	firebaseInstance,
	CONFIG.timeToExpireCache,
);
const jobUpdate = new JobUpdate(jobRepository);
export const ServiceContainer = {
	resume: {
		get: new ResumeGet(resumeRepository),
		create: new ResumeCreate(
			resumeRepository,
			llmResumeRepository,
			jobUpdate,
			tokenizer,
		),
	},
	api: {
		validate: new ApiKeyValidate(apiKeyRepository, userRepository),
	},
	user: {
		updateQuota: new UserUpdateQuota(userRepository),
	},
	parsers: {
		text: new TextParserService(),
		pdf: new PDFParserService(),
	},
	job: {
		create: new JobCreate(jobRepository),
		get: new JobGet(jobRepository),
	},
};
