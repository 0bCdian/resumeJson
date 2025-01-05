import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Loader } from "../components/Loader";
import type { QueryClient } from "@tanstack/react-query";
import { NotFoundComponent } from "../components/NotFound";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { type AuthState, useAuth } from "../context/AuthContext";
import { Drawer } from "../components/Drawer";

type RouterContext = {
	auth: AuthState;
	queryClient: QueryClient;
};
const isDEV = import.meta.env.DEV;
export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => {
		const { loading } = useAuth();
		if (loading) {
			return <Loader />;
		}
		return (
			<Drawer>
				<Outlet />
				{isDEV && <TanStackRouterDevtools position={"bottom-right"} />}
			</Drawer>
		);
	},
	notFoundComponent: NotFoundComponent,
	pendingComponent: Loader,
});
