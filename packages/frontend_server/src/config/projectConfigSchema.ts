import { z } from "zod";

export const configSchema = z.object({
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
	projectID: z.string().describe("fireStoreProjectId").optional(),
	dbID: z.string().describe("firestore id to connect to"),
	port: z.number().describe("Port to listen in, default 3000"),
	env: z
		.union([z.literal("development"), z.literal("production")])
		.default("development"),
});

export type configType = z.infer<typeof configSchema>;
