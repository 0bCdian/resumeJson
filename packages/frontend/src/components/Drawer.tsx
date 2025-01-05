import { Link, useNavigate } from "@tanstack/react-router";
import { NotebookText } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type WrapperProps = React.PropsWithChildren<{
	children: typeof React.Children;
}>;

export function Drawer({ children }: WrapperProps) {
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (user === null && !loading) {
			navigate({ to: "/" });
		}
	}, [user, navigate, loading]);
	if (!user) return children;
	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-300 w-full">
					<div className="flex-none lg:hidden">
						<label
							htmlFor="my-drawer"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost"
						>
							<svg
								role="img"
								aria-label="hamburguer icon"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-6 w-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 text-lg font-extrabold">
						<NotebookText className="mx-2" /> CV JSON API
					</div>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal text-lg">
							<li>
								<Link to="/home">Home</Link>
							</li>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<Link to="/apis">Apis</Link>
							</li>
							<li className="mt-auto">
								<button type="button" onClick={logout}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
				{children}
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				/>
				<ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg">
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<Link to="/apis">Apis</Link>
					</li>
					<li className="mt-auto">
						<button type="button" onClick={logout}>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
