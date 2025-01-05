import type { JobUpdate } from "../../Job/Application/JobUpdate";
import { logError } from "../../Shared/Logger/logError";
import type { Tokenizer } from "../../Shared/Domain/Tokenizer";
import type { jobSchemaType } from "../../Job/Domain/Schemas/jobSchema";
import type { ResumeRepository } from "../Domain/Ports/ResumeRepository";
import type { AIResumeRepository } from "../Domain/Ports/AIResumeRepository";
import { UserResume } from "../Domain/Entities/UserResume";
import type { User } from "../../User/Domain/Schemas/UserSchema";
import { ResumeNotFoundError } from "../Domain/Errors/ResumeNotFoundError";

export class ResumeCreate {
	constructor(
		private resumeRepository: ResumeRepository,
		private llmRepository: AIResumeRepository,
		private jobUpdate: JobUpdate,
		private tokenizer: Tokenizer,
	) {}

	async run(parsedText: string, job: jobSchemaType, user: User): Promise<void> {
		try {
			const hash = await this.tokenizer.hash(parsedText);
			try {
				const cachedResume = await this.resumeRepository.get(hash, user.id);
				if (cachedResume) {
					await this.jobUpdate.run(
						{
							jobID: job.id,
							status: "successful",
							resourceLocation: hash,
						},
						user.id,
					);
					return;
				}
			} catch (error) {
				if (!(error instanceof ResumeNotFoundError)) {
					logError(error);
				}
			}
			const tokens = await this.tokenizer.countTokens(parsedText);
			const userResume = this.createUserResume(parsedText, tokens, hash, user);

			const resume = await this.llmRepository.create(userResume);
			await this.resumeRepository.store(resume, user.id);
			await this.jobUpdate.run(
				{
					jobID: job.id,
					status: "successful",
					resourceLocation: hash,
				},
				user.id,
			);
		} catch (error) {
			await this.handleError(job.id, error, user.id);
		}
	}

	private createUserResume(
		parsedText: string,
		tokens: number,
		hash: string,
		user: User,
	): UserResume {
		return new UserResume(parsedText, tokens, hash, user);
	}
	private async handleError(
		jobID: string,
		error: unknown,
		userID: string,
	): Promise<void> {
		logError(error);

		const errorMessage =
			error instanceof Error
				? error.message
				: `Unknown error occurred at ${Date.now()}: ${error}`;

		await this.jobUpdate.run(
			{
				jobID,
				status: "failed",
				error: errorMessage,
			},
			userID,
		);
	}
}
