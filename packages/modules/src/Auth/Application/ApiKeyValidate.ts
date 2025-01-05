import { logError } from "../../Shared/Logger/logError";
import type { User } from "../../User/Domain/Schemas/UserSchema";
import type { UserRepository } from "../../User/Domain/UserRepository";
import type { ApiKeyRepository } from "../Domain/ApiKeyRepository";

export class ApiKeyValidate {
	constructor(
		private readonly apiKeyRepository: ApiKeyRepository,
		private readonly userRepository: UserRepository,
	) {}

	async run(rawApiKey: string): Promise<User | null> {
		try {
			// Extract unique ID (e.g., first 7 characters from the raw API key)
			const apiKeyId = rawApiKey.slice(0, 7);

			// Fetch hashed API key from the database
			const apiKey = await this.apiKeyRepository.get(apiKeyId);
			if (!apiKey) return null;

			// Verify the raw key against the hash
			const isValid = await Bun.password.verify(rawApiKey, apiKey.apiKey);
			if (!isValid) return null;

			// Fetch and return the associated user
			return await this.userRepository.get(apiKey.userId);
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
