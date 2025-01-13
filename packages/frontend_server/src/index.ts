import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import apiKeysRouter from "./routes/apiKeys";
import userRouter from "./routes/user";
import { CONFIG } from "./config/projectConfig";
import { logError } from "@json_cv_api/modules/src/Shared/Logger/logError";
const app = new Hono();

app.use(async (c, next) => {
	try {
		await next();
	} catch (err) {
		logError(err);
		return c.json({ error: err }, 500);
	}
});
// Add logger before CORS to log all requests

app.use(logger());

// Apply CORS to all routes, not just /api/*
app.use(
	"*",
	cors({
		origin: ["http://localhost:3002"],
		credentials: true,
		allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length"],
		maxAge: 86400,
	}),
);

// Routes
app.route("/api", apiKeysRouter);
app.route("/api", userRouter);
app.use("*", serveStatic({ root: "./static" }));
app.use("/*", serveStatic({ root: "./static", path: "index.html" }));

export default {
	port: CONFIG.port,
	fetch: app.fetch,
	serve: {
		idleTimeout: 30000,
		development: process.env.ENV === "development",
		// Add error handler for server-level errors
		error(error: Error) {
			console.error("[Server Error]:", error);
		},
	},
};
