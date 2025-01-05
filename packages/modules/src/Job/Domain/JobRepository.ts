import type { jobSchemaType, jobStatusEnum } from "./Schemas/jobSchema";

type JobUpdateSuccess = {
	jobID: string;
	resourceLocation: string;
	status: typeof jobStatusEnum.SUCCESSFUL;
};

type JobUpdateError = {
	jobID: string;
	error: string;
	status: typeof jobStatusEnum.FAILED;
};

export type JobUpdateInfo = JobUpdateSuccess | JobUpdateError;

export interface JobRepository {
	store: (job: jobSchemaType, userID: string) => Promise<void>;
	get: (jobID: string, userID: string) => Promise<jobSchemaType>;
	update: (jobInfo: JobUpdateInfo, userID: string) => Promise<void>;
}
