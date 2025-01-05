import { createRoute, z } from "@hono/zod-openapi";
import { jobSchema } from "@json_cv_api/modules/src/Job/Domain/Schemas/jobSchema";

export const getJob = createRoute({
	method: "get",
	path: "/{id}",
	request: {
		headers: z.object({
			"X-API-Key": z.string(),
		}),
		params: z.object({
			id: z
				.string()
				.uuid()
				.openapi({
					param: {
						name: "id",
						in: "path",
					},
					example: "b8b3d48e-38f0-4058-aa3c-88c9f03b3a31",
				}),
		}),
	},
	responses: {
		200: {
			description:
				"Responds with job object which represents the status of the parsing resume job queried",
			content: {
				"application/json": {
					schema: jobSchema,
				},
			},
		},
		400: {
			description: "Malformed request",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
		404: {
			description: "No jobs found",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
	},
});
