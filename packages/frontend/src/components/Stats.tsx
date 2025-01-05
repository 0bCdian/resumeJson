import { Hash, Maximize2, BarChart2 } from "lucide-react";
type Props = {
	userData:
		| {
				id: string;
				maxApiCallsPerMonth: number;
				maxTokensPerRequests: number;
				currentApiCallCount: number;
		  }
		| null
		| undefined;
};

export function Stats({ userData }: Props) {
	if (!userData) return null;
	return (
		<div className="stats stats-vertical lg:stats-horizontal shadow-customShadow bg-base-300 text-xl">
			<div className="stat gap-2">
				<div className="stat-figure text-primary">
					<Maximize2 />
				</div>
				<div className="stat-title">Max API Calls / Month</div>
				<div className="stat-value text-primary">
					{userData.maxApiCallsPerMonth}
				</div>
				<div className="stat-desc">Max api calls allowed per month</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
					<BarChart2 />
				</div>
				<div className="stat-title">Current Api Call Count</div>
				<div className="stat-value text-secondary">
					{userData.currentApiCallCount} / {userData.maxApiCallsPerMonth}
				</div>
				<div className="stat-desc">Current api calls</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-warning">
					<Hash />
				</div>
				<div className="stat-title">Max Tokens Per Request</div>
				<div className="stat-value text-warning">
					{userData.maxTokensPerRequests}
				</div>
				<div className="stat-desc">Max Tokens per api request</div>
			</div>
		</div>
	);
}
