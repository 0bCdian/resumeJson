import { logError } from "../../Shared/Logger/logError";
import type { User } from "../Domain/Schemas/UserSchema";
import type { UserRepository } from "../Domain/UserRepository";

export class UserCreate {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly userDefaultApiCalls: number,
		private readonly maxTokensPerRequest: number,
	) {}
	async run(userID: string): Promise<boolean | User> {
		try {
			try {
				const user = await this.userRepo.get(userID);
				if (user) return user;
			} catch (_error) {}
			const newUser: User = {
				id: userID,
				currentApiCallCount: 0,
				maxApiCallsPerMonth: this.userDefaultApiCalls,
				maxTokensPerRequests: this.maxTokensPerRequest,
			};
			await this.userRepo.store(newUser);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
