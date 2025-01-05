import { createFileRoute } from "@tanstack/react-router";
import { Stats } from "../../components/Stats";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api";
import { useAuth } from "../../context/AuthContext";

export const Route = createFileRoute("/__authenticated/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();
	const { data, isLoading } = useQuery({
		queryFn: () => getUser({ user }),
		queryKey: ["user"],
	});
	if (isLoading) return <div>Loading</div>;
	return (
		<div className=" min-h-[90dvh] w-full flex flex-col items-center justify-center">
			<Stats userData={data} />
		</div>
	);
}
