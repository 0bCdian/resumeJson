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
const apiKeyRepository = new FireStoreApiKeyRepository(fireStoreInstance);
const userRepository = new FireStoreUserRepository(fireStoreInstance);
const tokenizer = new TokenizerService();
const resumeRepository = new FireStoreResumeRepository(
	fireStoreInstance,
	CONFIG.timeToExpireCache,
);
const llmResumeRepository = new OpenAIResumeRepository(CONFIG.openAIApiKey);
const jobRepository = new FireStoreJobRepository(
	fireStoreInstance,
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
