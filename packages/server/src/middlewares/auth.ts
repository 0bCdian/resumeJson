import { createMiddleware } from "hono/factory";
import { ServiceContainer } from "../serviceContainer";
import { ApiKeyValidationError } from "@json_cv_api/modules/src/Auth/Domain/Errors/ApiKeyValidationError";
import type { User } from "@json_cv_api/modules/src/User/Domain/Schemas/UserSchema";
import { UserQuotaExceededError } from "@json_cv_api/modules/src/User/Domain/Errors/UserQuotaExceededError";
import { logError } from "@json_cv_api/modules/src/Shared/Logger/logError";
export type ContextUser = {
	Variables: {
		user: User;
	};
};
export const auth = createMiddleware<ContextUser>(async (c, next) => {
	try {
		const apiKey = c.req.header("X-API-Key");
		if (!apiKey)
			return c.json(
				{
					error: "Missing api key in header",
					status: "failed",
				},
				400,
			);
		const user = await ServiceContainer.api.validate.run(apiKey);
		if (!user)
			throw new ApiKeyValidationError({
				context: {
					url: c.req.url,
					cause: "Non existent user",
				},
			});
		if (user.currentApiCallCount === user.maxApiCallsPerMonth)
			throw new UserQuotaExceededError({
				context: {
					url: c.req.url,
					user: user,
					context: "Exceeded api call count",
				},
			});
		if (c.req.method === "POST") {
			const didUpdate = await ServiceContainer.user.updateQuota.run(user);
			if (!didUpdate) {
				throw new Error("Failed to update the user's quota");
			}
		}
		c.set("user", user);
		await next();
	} catch (error) {
		logError(error);
		if (error instanceof UserQuotaExceededError) {
			return c.json({ error: "Monthly quota exceeded", status: "failed" }, 402);
		}
		if (error instanceof ApiKeyValidationError) {
			return c.json({ error: "Bad credentials", status: "failed" }, 401);
		}
		throw error;
	}
});
