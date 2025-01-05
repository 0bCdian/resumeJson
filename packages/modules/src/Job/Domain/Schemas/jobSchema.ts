import { z } from "zod";

export const jobStatusEnum = {
	FAILED: "failed" as const,
	SUCCESSFUL: "successful" as const,
	PENDING: "pending" as const,
};
export const jobStatusSchema = z.union([
	z.literal("successful"),
	z.literal("pending"),
	z.literal("failed"),
]);

const jobPending = z.object({
	status: z.literal(jobStatusEnum.PENDING),
	id: z.string().uuid(),
});

const jobFailed = z.object({
	status: z.literal(jobStatusEnum.FAILED),
	id: z.string().uuid(),
	error: z.string(),
});

const jobSuccess = z.object({
	status: z.literal(jobStatusEnum.SUCCESSFUL),
	id: z.string().uuid(),
	resourceLocation: z.string(),
});

export const jobSchema = z.discriminatedUnion("status", [
	jobSuccess,
	jobPending,
	jobFailed,
]);
export type jobSchemaType = z.infer<typeof jobSchema>;
