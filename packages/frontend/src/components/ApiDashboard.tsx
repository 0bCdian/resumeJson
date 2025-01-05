import { Trash2 } from "lucide-react";
import type { ApiKey } from "../types/api";

type Props = {
	data: ApiKey[];
	createApi: () => void;
	deleteApi: (apiKeyID: string) => void;
};
export function ApiDashboard({ data, createApi, deleteApi }: Props) {
	return (
		<div className="card w-full bg-base-300 text-base h-[calc(90dvh-4rem)]">
			<div className="card-body overflow-y-auto max-h-[calc(100%)] lg:table-pin-rows">
				<h2 className="card-title font-extrabold text-3xl mb-4">
					Api Dashboard
				</h2>
				<div className="flex justify-between mb-4">
					<h3 className="lg:text-2xl font-semibold mb-4">Your API Keys</h3>
					<button
						type="button"
						onClick={() => {
							createApi();
						}}
						className="btn btn-sm btn-primary lg:btn-md"
					>
						Create New API Key
					</button>
				</div>

				<div className="divider" />
				<div className="overflow-x-auto">
					<table className="table table-zebra text-lg">
						{/* head */}
						<thead>
							<tr className="text-lg">
								<th>ID</th>
								<th>Api Key</th>
								<th>Created At</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((api, index) => {
								return (
									<tr key={api.id}>
										<th>{index + 1}</th>
										<td>{api.id}****************</td>
										<td>{api.createdAt}</td>
										<td>
											<button
												type="button"
												onClick={() => {
													deleteApi(api.id);
												}}
												className="btn btn-error"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
