import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated")({
	beforeLoad: async ({ context }) => {
		const { user } = context.auth;
		if (!user) {
			throw redirect({ to: "/" });
		}
		return <Outlet />;
	},
});
