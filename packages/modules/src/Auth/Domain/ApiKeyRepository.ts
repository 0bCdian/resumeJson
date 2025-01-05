import type { ApiKey } from "./ApiKeySchema";
export interface ApiKeyRepository {
	store: (apiKey: ApiKey) => Promise<void>;
	get: (apiKeyHashed: string) => Promise<ApiKey>;
	getUserApi: (apiKeyHashed: string, userID: string) => Promise<ApiKey>;
	delete: (ApiKeyHashed: string, userID: string) => Promise<void>;
	getAll: (userID: string) => Promise<ApiKey[]>;
}
