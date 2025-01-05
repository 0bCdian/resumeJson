import { configSchema, type configType } from "./projectConfigSchema";
import { env } from "./env";
import { EnvConfigError } from "@json_cv_api/modules/src/Shared/Domain/Errors/EnvConfigError";
import { BaseError } from "@json_cv_api/modules/src/Shared/Domain/Errors/BaseError";

export const CONFIG = {
	port: env.PORT,
	env: env.ENV,
	userDefaultApiCalls: 500,
	userMaxCallsPerMinute: 20,
	fireStoreProjectId: env.FIRESTORE_PROJECT_ID,
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
