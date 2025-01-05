import { logError } from "../../Shared/Logger/logError";
import type { JobRepository } from "../Domain/JobRepository";
import type { jobSchemaType } from "../Domain/Schemas/jobSchema";

export class JobGet {
	constructor(private readonly jobRepository: JobRepository) {}

	async run(jobID: string, userID: string): Promise<jobSchemaType | null> {
		try {
			return await this.jobRepository.get(jobID, userID);
		} catch (error) {
			logError(error);
			return null;
		}
	}
}
