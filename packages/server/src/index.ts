import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import resumeRouter from "./routes/resume/HonoResumeRouter";
import jobsRouter from "./routes/jobs/HonoJobRouter";
import { auth } from "./middlewares/auth";
const app = new OpenAPIHono();

app.use(async (c, next) => {
	try {
		await next();
	} catch (err) {
		if (err instanceof Error) {
			return c.text("Internal server error", 500);
		}
	}
});
app.get("/", (c) => {
	return c.redirect("/ui", 302);
});

app.doc("/doc", {
	info: {
		title: "Json Resume Api",
		version: "v1",
		description:
			"An api that parses resumes into the json resume schema \n https://jsonresume.org/",
	},
	openapi: "3.1.0",
});

app.get("/ui", swaggerUI({ url: "/doc" }));
app.use(auth);
app.route("resume/", resumeRouter);
app.route("job/", jobsRouter);
app.onError((err, c) => {
	return c.json(
		{
			error: err.message,
		},
		500,
	);
});

export default app;
