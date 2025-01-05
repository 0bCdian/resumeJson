import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
	context: { auth: undefined!, queryClient },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
function InnerApp() {
	const auth = useAuth();
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{ auth }} />
		</QueryClientProvider>
	);
}
function App() {
	return (
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	);
}

export default App;
