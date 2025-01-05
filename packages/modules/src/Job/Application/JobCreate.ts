import { Job } from "../Domain/Job";
import type { JobRepository } from "../Domain/JobRepository";
import type { jobSchemaType } from "../Domain/Schemas/jobSchema";

export class JobCreate {
	constructor(private readonly jobRepository: JobRepository) {}

	async run(userID: string): Promise<jobSchemaType | null> {
		const newJob = new Job().toJSON();
		await this.jobRepository.store(newJob, userID);
		return newJob;
	}
}
