import { Hono } from "hono";
import { ServiceContainer } from "../serviceContainer";
import { bearerAuth } from "../middlewares/auth";

const app = new Hono()
	.use(bearerAuth)
	.post("/user", async (c) => {
		try {
			console.log(c.var.userID);
			const result = await ServiceContainer.user.create.run(c.var.userID);
			if (typeof result === "object") {
				return c.json({ error: "User already exists" }, 409);
			}
			if (!result) {
				return c.json({ error: "Error creating user" }, 500);
			}
			return c.json({ success: true }, 201);
		} catch (error) {
			console.error("[User Create Error]:", error);
			return c.json({ error: "Error creating user" }, 500);
		}
	})
	.delete("/user", async (c) => {
		try {
			const success = await ServiceContainer.user.delete.run(c.var.userID);
			if (!success) {
				return c.json({ error: "Error deleting user" }, 500);
			}
			return c.json({ success }, 200);
		} catch (error) {
			console.error("[User Delete Error]:", error);
			return c.json({ error: "Error deleting user" }, 500);
		}
	})
	.get("/user", async (c) => {
		try {
			console.log("get user");
			const user = await ServiceContainer.user.get.run(c.var.userID);
			if (!user) {
				return c.json({ error: "User not found" }, 404);
			}
			const userApis = await ServiceContainer.api.getAll.run(user.id);
			return c.json({ ...user, userApis }, 200);
		} catch (error) {
			return c.json({ error: "Error fetching user data" }, 500);
		}
	});
export default app;
