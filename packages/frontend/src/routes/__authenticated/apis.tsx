import { createFileRoute } from "@tanstack/react-router";
import { ApiDashboard } from "../../components/ApiDashboard";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createApi, deleteApi, getUser } from "../../api";
import type { ApiKey } from "../../types/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CopyInput } from "../../components/CopyInput";

export const Route = createFileRoute("/__authenticated/apis")({
	component: RouteComponent,
});
function RouteComponent() {
	const { user } = useAuth();
	const ref = useRef<HTMLDialogElement>(null);
	const [apiRaw, setApiRaw] = useState<string>("");
	const toggleModal = useCallback(() => {
		ref.current?.showModal();
	}, []);
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryFn: () => getUser({ user }),
		queryKey: ["user"],
	});
	const { mutateAsync: createNewApi, data: newestApi } = useMutation({
		mutationFn: () => createApi({ user }),
		onSuccess: (newApiCreated) => {
			if (newApiCreated !== null) {
				toggleModal();
				queryClient.invalidateQueries({ queryKey: ["user"] });
			}
		},
	});
	const { mutateAsync: delApi } = useMutation({
		mutationFn: (apiKeyID: string) => deleteApi({ user, apiKeyID }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
	const apis = useMemo(() => {
		return data?.userApis ?? ([] as ApiKey[]);
	}, [data]);
	useEffect(() => {
		if (newestApi) {
			setApiRaw(newestApi.rawApi); // Update apiRaw when newestApi is available
		}
	}, [newestApi]);
	return (
		<div className="container mt-12 m-auto">
			<dialog
				ref={ref}
				id="apiKeyModal"
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box flex flex-col gap-2">
					<h3 className="font-bold text-2xl">New Api Key Created</h3>
					<p className="text-error italic mt-4">
						Make sure to copy the api key, you won't be able to see it again{" "}
					</p>
					<div className="modal-action">
						<form method="dialog" className="w-full mb-4">
							<CopyInput value={apiRaw} />
							<button
								type="submit"
								onClick={() => {
									setApiRaw("");
								}}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								✕
							</button>
						</form>
					</div>
				</div>
			</dialog>
			<ApiDashboard data={apis} createApi={createNewApi} deleteApi={delApi} />
		</div>
	);
}
