import { z } from "zod";

export const configSchema = z.object({
	timeToExpireCache: z
		.number()
		.positive()
		.describe(
			"Constant used to calculate time to expire in firebase resume documents cache",
		),
	userDefaultApiCalls: z
		.number()
		.positive()
		.describe("minimum default api calls quota set a user creation time"),
	userMaxCallsPerMinute: z
		.number()
		.positive()
		.describe("User's max calls per minute, used for api calls rate limiting"),
	maxTokensPerRequest: z
		.number()
		.int()
		.positive()
		.describe("How long of a resume a user can parse converted to tokens"),
	openAIApiKey: z.string().describe("openAIApiKey").optional(),
	env: z
		.union([z.literal("development"), z.literal("production")])
		.default("development"),
	fireStoreProjectId: z.string().describe("fireStoreProjectId").optional(),
});

export type configType = z.infer<typeof configSchema>;
