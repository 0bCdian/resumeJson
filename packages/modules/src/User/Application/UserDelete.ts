import { logError } from "../../Shared/Logger/logError";
import type { UserRepository } from "../Domain/UserRepository";

export class UserDelete {
	constructor(private readonly userRepo: UserRepository) {}
	async run(userID: string): Promise<boolean> {
		try {
			await this.userRepo.delete(userID);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
