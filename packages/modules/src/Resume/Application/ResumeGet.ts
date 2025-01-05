import { logError } from "../../Shared/Logger/logError";
import type { ResumeRepository } from "../Domain/Ports/ResumeRepository";

export class ResumeGet {
	constructor(private resumeRepository: ResumeRepository) {}
	async run(key: string, userID: string) {
		try {
			return await this.resumeRepository.get(key, userID);
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
