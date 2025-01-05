import { Hono } from "hono";
import { bearerAuth } from "../middlewares/auth";
import { ServiceContainer } from "../serviceContainer";
import { BaseError } from "@json_cv_api/modules/src/Shared/Domain/Errors/BaseError";

// create new api
const app = new Hono()
	.use(bearerAuth)
	.post("/keys", async (c) => {
		try {
			const api = await ServiceContainer.api.create.run(c.var.userID);
			if (!api) {
				throw new BaseError("Error generating api", {
					context: { userID: c.var.userID },
				});
			}
			return c.json(api, 201); // Changed to 201 for resource creation
		} catch (error) {
			console.error("[API Create Error]:", error);
			return c.json({ error: "Error creating API key" }, 500);
		}
	})
	.delete("/keys/:api", async (c) => {
		try {
			const apiKeyID = c.req.param("api");
			const result = await ServiceContainer.api.delete.run(
				apiKeyID,
				c.var.userID,
			);
			if (!result) {
				return c.json({ error: "Error deleting api" }, 500);
			}
			return c.json({ success: true }, 200); // Changed to 204 for DELETE
		} catch (error) {
			console.error("[API Delete Error]:", error);
			return c.json({ error: "Error deleting API key" }, 500);
		}
	});
export default app;
