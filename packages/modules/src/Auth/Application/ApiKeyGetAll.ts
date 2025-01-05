import type { ApiKeyRepository } from "../Domain/ApiKeyRepository";
import { logError } from "../../Shared/Logger/logError";
import type { ApiKey } from "../Domain/ApiKeySchema";

export class ApiKeyGetAll {
	constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

	async run(userID: string): Promise<ApiKey[] | null> {
		try {
			console.log("ApiKeyGetAll");
			return await this.apiKeyRepository.getAll(userID);
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
