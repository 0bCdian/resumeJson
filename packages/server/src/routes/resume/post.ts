import { createRoute, z } from "@hono/zod-openapi";
import { jobStatusEnum } from "@json_cv_api/modules/src/Job/Domain/Schemas/jobSchema";

export const parseText = createRoute({
	method: "post",
	path: "/parse/text",
	request: {
		headers: z.object({
			"X-API-Key": z.string(),
		}),
		body: {
			required: true,
			description: "Required payload",
			content: {
				"text/plain": {
					schema: z.string(),
				},
			},
		},
	},
	responses: {
		202: {
			description:
				"Responds with job object which represents the status of the parsing resume job",
			content: {
				"application/json": {
					schema: z.object({
						id: z.string(),
						status: z.literal(jobStatusEnum.PENDING),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		400: {
			description: "Bad request",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		402: {
			description: "Quota Exceeded",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		415: {
			description: "Invalid filetype in header",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
	},
});

export const parsePDF = createRoute({
	method: "post",
	path: "/parse/pdf",
	request: {
		headers: z.object({
			"X-API-Key": z.string(),
		}),
		body: {
			required: true,
			description: "Required payload",
			content: {
				"application/pdf": {
					schema: z.instanceof(Buffer).openapi({
						format: "binary",
					}),
				},
			},
		},
	},
	responses: {
		202: {
			description:
				"Responds with job object which represents the status of the parsing resume job",
			content: {
				"application/json": {
					schema: z.object({
						id: z.string(),
						status: z.literal(jobStatusEnum.PENDING),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		400: {
			description: "Bad request",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		402: {
			description: "Quota Exceeded",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
		415: {
			description: "Invalid filetype in headers",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string().optional(),
						status: z.literal(jobStatusEnum.FAILED),
					}),
				},
			},
		},
	},
});
