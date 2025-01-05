import { createMiddleware } from "hono/factory";
import { ServiceContainer } from "../serviceContainer";
import { logError } from "@json_cv_api/modules/src/Shared/Logger/logError";

export type ContextAuth = {
	Variables: {
		userID: string;
	};
};

export const bearerAuth = createMiddleware<ContextAuth>(async (c, next) => {
	try {
		const header = c.req.header("Authorization");
		if (!header) {
			return c.json({ error: "Authorization header missing" }, 401);
		}

		const [scheme, token] = header.split(" ");
		if (scheme !== "Bearer" || !token) {
			return c.json({ error: "Invalid authorization format" }, 401);
		}

		const result = await ServiceContainer.auth.verifyIdToken(token);
		if (!result?.uid) {
			return c.json({ error: "Invalid token" }, 401);
		}

		c.set("userID", result.uid);
		await next();
	} catch (error) {
		logError(error);
		if (error instanceof Error) {
			if (error.message.includes("token")) {
				return c.json({ error: "Invalid token" }, 401);
			}
			if (error.message.includes("expired")) {
				return c.json({ error: "Token expired" }, 401);
			}
		}
		return c.json({ error: "Authentication failed" }, 401);
	}
});
