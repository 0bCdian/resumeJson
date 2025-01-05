import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

dotenv.config().parsed;
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite({}), react()],
	base: "/",
});
