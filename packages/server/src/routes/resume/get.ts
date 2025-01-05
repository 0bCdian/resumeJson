import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import { ResumeSchema } from "@json_cv_api/modules/src/Resume/Domain/Schemas/ResumeSchema";
export const getResume = createRoute({
	method: "get",
	path: "/{id}",
	request: {
		headers: z.object({
			"X-API-Key": z.string(),
		}),
		params: z.object({
			id: z.string().openapi({
				param: {
					name: "id",
					in: "path",
				},
				example: "88c9f03b3a31",
			}),
		}),
	},
	responses: {
		200: {
			description: "Responds with the json resume object",
			content: {
				"application/json": {
					schema: ResumeSchema,
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
			description: "No resume found",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
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
