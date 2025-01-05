import { logError } from "../../Shared/Logger/logError";
import type { User } from "../Domain/Schemas/UserSchema";
import type { UserRepository } from "../Domain/UserRepository";

export class UserResetQuota {
	constructor(private readonly userRepo: UserRepository) {}
	async run(user: User): Promise<boolean> {
		try {
			const newCallCount = 0;
			const newUser = { ...user, currentApiCallCount: newCallCount };
			await this.userRepo.update(newUser);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
