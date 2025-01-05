import type { ApiKeyRepository } from "../Domain/ApiKeyRepository";
import { logError } from "../../Shared/Logger/logError";

export class ApiKeyDelete {
	constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

	async run(apiKeyID: string, userID: string): Promise<boolean> {
		try {
			await this.apiKeyRepository.delete(apiKeyID, userID);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
