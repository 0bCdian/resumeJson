import { logError } from "../../Shared/Logger/logError";
import { UserQuotaExceededError } from "../Domain/Errors/UserQuotaExceededError";
import type { User } from "../Domain/Schemas/UserSchema";
import type { UserRepository } from "../Domain/UserRepository";

export class UserUpdateQuota {
	constructor(private readonly userRepo: UserRepository) {}
	async run(user: User): Promise<boolean> {
		try {
			const newCallCount = user.currentApiCallCount + 1;
			if (newCallCount > user.maxApiCallsPerMonth)
				throw new UserQuotaExceededError();
			const newUser = { ...user, currentApiCallCount: newCallCount };
			await this.userRepo.update(newUser);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
