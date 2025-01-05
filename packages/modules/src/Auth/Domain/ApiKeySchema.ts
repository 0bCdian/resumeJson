import { z } from "zod";
// API Key Schema
export const ApiKeySchema = z.object({
	id: z.string().describe("This are the first 7 chars of the apiKey"),
	apiKey: z.string().min(32).max(64),
	userId: z.string().uuid(),
	createdAt: z.string().datetime(),
});

export type ApiKey = z.infer<typeof ApiKeySchema>;
