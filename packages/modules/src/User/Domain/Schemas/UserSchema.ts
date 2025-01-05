import { z } from "zod";

// User Schema
export const UserSchema = z.object({
	id: z.string().uuid(),
	maxApiCallsPerMonth: z.number().int().positive(),
	maxTokensPerRequests: z.number().int().positive(),
	currentApiCallCount: z.number().int().positive(),
});

export type User = z.infer<typeof UserSchema>;
