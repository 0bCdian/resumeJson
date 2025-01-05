export type ApiKey = {
	id: string;
	apiKey: string;
	userId: string;
	createdAt: string;
};

export type NewApiKey = ApiKey & {
	rawApi: string;
};

export type User = {
	id: string;
	maxApiCallsPerMonth: number;
	maxTokensPerRequests: number;
	currentApiCallCount: number;
	userApis: ApiKey[] | null;
};
