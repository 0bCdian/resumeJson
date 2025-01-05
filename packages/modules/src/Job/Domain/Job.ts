import { jobStatusEnum, type jobSchemaType } from "./Schemas/jobSchema";

export class Job {
	id: string;
	status: jobSchemaType["status"];
	resourceLocation?: string;
	error?: string;

	constructor() {
		this.id = crypto.randomUUID();
		this.status = jobStatusEnum.PENDING;
	}

	/**
	 * Updates the resource location and status.
	 * Validates the job against the Zod schema.
	 */

	/**
	 * Converts the instance to a plain object matching the schema.
	 */
	toJSON(): jobSchemaType {
		switch (this.status) {
			case jobStatusEnum.PENDING:
				return {
					id: this.id,
					status: this.status,
				};
			case jobStatusEnum.FAILED:
				return {
					id: this.id,
					status: this.status,
					error: this.error!,
				};
			case jobStatusEnum.SUCCESSFUL:
				return {
					id: this.id,
					status: this.status,
					resourceLocation: this.resourceLocation!,
				};
			default:
				throw new Error("Invalid job status");
		}
	}
}
