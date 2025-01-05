import { OpenAPIHono } from "@hono/zod-openapi";
import { getJob } from "./get";
import { ServiceContainer } from "../../serviceContainer";
import { type ContextUser, auth } from "../../middlewares/auth";
const router = new OpenAPIHono<ContextUser>();
router.use(getJob.getRoutingPath(), auth);
router.openapi(getJob, async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ message: "Must provide id in params" }, 400);
	}
	const job = await ServiceContainer.job.get.run(id, c.var.user.id);
	if (!job) {
		return c.json({ message: "No jobs found" }, 404);
	}
	return c.json(job, 200);
});

export default router;
