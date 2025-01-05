import { Link } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
	const { user } = useAuth();
	if (!user) return null;
	return (
		<div className="navbar bg-base-300">
			<div className="navbar-start">
				<div className="dropdown">
					<label
						htmlFor="my-drawer"
						className="drawer-button btn btn-ghost btn-circle"
					>
						<svg
							role="img"
							aria-label="hamburguer menu icon"
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</label>
				</div>
			</div>
			<div className="navbar-center">
				<Link to="/" className="btn btn-ghost text-xl">
					CV JSON API
				</Link>
			</div>
			<div className="navbar-end min-w-fit" />
		</div>
	);
}
