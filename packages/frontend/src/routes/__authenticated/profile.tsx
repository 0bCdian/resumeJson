import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthContext";
import { Profile } from "../../components/Profile";
export const Route = createFileRoute("/__authenticated/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();
	if (!user) return;
	return (
		<div className=" min-h-[90dvh] flex flex-col items-center justify-center">
			<Profile user={user} />
		</div>
	);
}
