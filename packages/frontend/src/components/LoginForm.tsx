import Google from "../assets/Google";
import Github from "../assets/Github";
import type { User } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
export function LoginForm({ user }: { user: User | null }) {
	const { loginWithGithub, loginWithGoogle, logout } = useAuth();

	return (
		<div className="card w-96 bg-base-300 shadow-customShadow border-2 border-gray-500">
			<div className="card-body my-6">
				<h2 className="text-2xl text-center font-bold mb-6">Login</h2>
				<div className="form-control">
					<button
						type="button"
						onClick={loginWithGoogle}
						className="btn btn-outline flex items-center justify-center gap-2"
					>
						<Google className="w-5 h-5" />
						Sign in with Google
					</button>
				</div>
				<div className="form-control mt-4">
					<button
						type="button"
						className="btn btn-outline flex items-center justify-center gap-2"
					>
						<Github onClick={loginWithGithub} className="w-5 h-5" />
						Sign in with GitHub
					</button>
				</div>
				{user && (
					<div className="form-control mt-4">
						<button
							type="button"
							onClick={logout}
							className="btn btn-outline flex items-center justify-center gap-2"
						>
							Logout
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
