import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useLayoutEffect } from "react";
export const Route = createFileRoute("/login")({
	component: LoginComponent,
});
export function LoginComponent() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	useLayoutEffect(() => {
		if (user !== null) {
			navigate({ to: "/home" });
		}
	}, [user, navigate]);
	if (loading) return null;
	return (
		<div className=" flex items-center justify-center h-screen">
			<LoginForm user={user} />
		</div>
	);
}
