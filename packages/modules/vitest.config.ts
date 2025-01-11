import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
	test: {
		globals: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@tests": path.resolve(__dirname, "./tests"),
			"@mocks": path.resolve(__dirname, "./tests/mocks"),
			"@auth": path.resolve(__dirname, "./src/Auth"),
			"@job": path.resolve(__dirname, "./src/Job"),
			"@resume": path.resolve(__dirname, "./src/Resume"),
			"@shared": path.resolve(__dirname, "./src/Shared"),
			"@user": path.resolve(__dirname, "./src/User"),
		},
	},
});
