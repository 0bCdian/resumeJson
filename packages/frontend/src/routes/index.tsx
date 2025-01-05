import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

export const Route = createFileRoute("/")({
	component: IndexComponent,
});

function IndexComponent() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (user !== null) {
			navigate({ to: "/home" });
		}
	}, [user, navigate]);
	if (loading) return null;
	return (
		<div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
			<div className=" flex flex-col items-center text-center gap-6 max-w-3xl">
				<h1 className="font-bold text-7xl z-20">
					Let's Build Resumes <span className="text-primary">Together</span>
				</h1>

				<span className="z-20 max-w-lg text-xl">
					CV JSON is an api that parses resumes in both pdf and other text
					formats to a{" "}
					<a
						href="https://jsonresume.org/"
						target="_blank"
						className="link link-primary"
						rel="noreferrer"
					>
						json resume schema
					</a>{" "}
					format
				</span>

				<div className="flex gap-4 z-20 text-lg">
					<Link to="/login" className="btn btn-primary">
						Get started
					</Link>
				</div>
			</div>
		</div>
	);
}
