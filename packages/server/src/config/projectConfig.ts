import { configSchema, type configType } from "./projectConfigSchema";
import { env } from "./env";
import { EnvConfigError } from "@json_cv_api/modules/src/Shared/Domain/Errors/EnvConfigError";
import { BaseError } from "@json_cv_api/modules/src/Shared/Domain/Errors/BaseError";
// 1 week
const EXPIRE_CONSTANT = 7 * 24 * 60 * 60 * 1000;
export const CONFIG = {
	userDefaultApiCalls: 500,
	env: env.ENV,
	userMaxCallsPerMinute: 20,
	openAIApiKey: env.OPEN_AI_API_KEY,
	fireStoreProjectId: env.FIRESTORE_PROJECT_ID,
	timeToExpireCache: EXPIRE_CONSTANT,
	maxTokensPerRequest: 2000,
} as configType;

try {
	configSchema.parse(CONFIG);
} catch (error) {
	if (error instanceof Error) {
		throw new EnvConfigError({ error });
	}
	throw new BaseError(`Unknown Error ${error}`);
}
