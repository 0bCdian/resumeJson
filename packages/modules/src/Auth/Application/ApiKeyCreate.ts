import { logError } from "../../Shared/Logger/logError";
import type { ApiKeyRepository } from "../Domain/ApiKeyRepository";
import type { ApiKey } from "../Domain/ApiKeySchema";

type ApiKeyCreateResponse = ApiKey & {
	rawApi: string;
};
export class ApiKeyCreate {
	constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

	async run(userID: string): Promise<ApiKeyCreateResponse | null> {
		try {
			const apiKeyRaw = crypto.randomUUID();
			const apiID = apiKeyRaw.slice(0, 7).toString();
			const hashedApi = await Bun.password.hash(apiKeyRaw, {
				algorithm: "argon2d",
			});
			const apiKey: ApiKey = {
				id: apiID,
				apiKey: hashedApi,
				userId: userID,
				createdAt: new Date().toISOString(),
			};
			await this.apiKeyRepository.store(apiKey);
			return { ...apiKey, rawApi: apiKeyRaw };
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
