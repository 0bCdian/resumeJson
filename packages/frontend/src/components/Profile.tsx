import type { User } from "firebase/auth";
import { deleteUser } from "../api";
import { useRef } from "react";

type Props = { user: User };

export function Profile({ user }: Props) {
	const ref = useRef<HTMLDialogElement>(null);
	return (
		<div className="m-auto flex flex-col items-center justify-center gap-5">
			<h1 className="text-4xl">Hello {user.displayName}</h1>
			<button
				type="button"
				className="btn btn-error"
				onClick={() => {
					if (ref) {
						ref.current?.showModal();
					}
				}}
			>
				Delete User
			</button>

			<dialog
				ref={ref}
				id="delete_user_modal"
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box ">
					<h3 className="font-bold text-xl">
						Are you sure you want to delete you account?
					</h3>
					<p className="py-4">This action is permanent</p>
					<div className="modal-action">
						<form method="dialog">
							<button
								type="button"
								className="btn btn-error mr-2"
								onClick={async () => {
									const result = await deleteUser({ user });
									if (result) {
										await user.delete();
									} else {
										throw new Error();
									}
								}}
							>
								Yes
							</button>
							<button type="button" className="btn">
								No
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
