import { OpenAPIHono } from "@hono/zod-openapi";
import { parsePDF, parseText } from "./post";
import { getResume } from "./get";
import { ServiceContainer } from "../../serviceContainer";
import { JobCreationError } from "@json_cv_api/modules/src/Job/Domain/Errors/JobCreationError";
import { logError } from "@json_cv_api/modules/src/Shared/Logger/logError";
import { type ContextUser, auth } from "../../middlewares/auth";
const router = new OpenAPIHono<ContextUser>();

router.use(parseText.getRoutingPath(), auth);
router.openapi(parseText, async (c) => {
	const contentType = c.req.header("content-type");
	if (contentType === undefined) {
		const message = "Missing contentType header";
		return c.json({ status: "failed" as const, error: message }, 400);
	}
	if ("text/plain" !== contentType) {
		const message = "Invalid filetype";
		return c.json({ status: "failed" as const, error: message }, 415);
	}
	try {
		const job = await ServiceContainer.job.create.run(c.var.user.id);
		if (!job) throw new JobCreationError({ context: c.req.url });
		const arrBuffer = await c.req.arrayBuffer();
		const buffer = Buffer.from(arrBuffer);
		const parsedText = await ServiceContainer.parsers.text.parse(buffer);
		ServiceContainer.resume.create.run(parsedText, job, c.var.user);
		const { id } = job;
		return c.json({ status: "pending" as const, id }, 202);
	} catch (error) {
		logError(error);
		return c.json(
			{ status: "failed" as const, error: "Internal server error" },
			500,
		);
	}
});

router.openapi(parsePDF, async (c) => {
	const contentType = c.req.header("content-type");
	if (contentType === undefined) {
		const message = "Missing contentType header";
		return c.json({ status: "failed" as const, error: message }, 400);
	}
	if ("application/pdf" !== contentType) {
		const message = "Invalid filetype";
		return c.json({ status: "failed" as const, error: message }, 415);
	}
	try {
		const job = await ServiceContainer.job.create.run(c.var.user.id);
		if (!job) throw new JobCreationError({ context: c.req.url });
		const arrBuffer = await c.req.arrayBuffer();
		const buffer = Buffer.from(arrBuffer);
		const parsedText = await ServiceContainer.parsers.pdf.parse(buffer);
		ServiceContainer.resume.create.run(parsedText, job, c.var.user);
		const { id } = job;
		return c.json({ status: "pending" as const, id }, 202);
	} catch (error) {
		logError(error);
		return c.json(
			{ status: "failed" as const, error: "Internal server error" },
			500,
		);
	}
});

router.openapi(getResume, async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ message: "Must provide resume ID" }, 400);
	}
	try {
		const result = await ServiceContainer.resume.get.run(id, c.var.user.id);
		if (result === null) {
			return c.json({ message: "Not Found" }, 404);
		}
		return c.json(result, 200);
	} catch (error) {
		logError(error);
		return c.json({ message: "Internal server error" }, 500);
	}
});

export default router;
