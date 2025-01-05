import { logError } from "../../Shared/Logger/logError";
import type { JobRepository, JobUpdateInfo } from "../Domain/JobRepository";

export class JobUpdate {
	constructor(private readonly jobRepository: JobRepository) {}

	async run(newInfo: JobUpdateInfo, userID: string): Promise<boolean> {
		try {
			await this.jobRepository.update(newInfo, userID);
			return true;
		} catch (error) {
			logError(error);
			return false;
		}
	}
}
