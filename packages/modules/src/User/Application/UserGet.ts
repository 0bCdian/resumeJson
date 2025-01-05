import { logError } from "../../Shared/Logger/logError";
import type { User } from "../Domain/Schemas/UserSchema";
import type { UserRepository } from "../Domain/UserRepository";

export class UserGet {
	constructor(private readonly userRepo: UserRepository) {}
	async run(userID: string): Promise<User | null> {
		try {
			const user = await this.userRepo.get(userID);
			return user;
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
