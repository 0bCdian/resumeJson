import { Timestamp } from "firebase-admin/firestore";
import type { JobRepository, JobUpdateInfo } from "../Domain/JobRepository";
import type { jobSchemaType } from "../Domain/Schemas/jobSchema";
import { FIRESTORE_COLLECTIONS } from "../../Shared/Types/firestoreCollections";
import { JobNotFoundError } from "../Domain/Errors/JobNotFoundError";
import { JobCreationError } from "../Domain/Errors/JobCreationError";
import { exhaustiveGuard } from "../../Shared/Utils/exahustiveGuard";
import type { firestoreInstance } from "../../Shared/Types/fireStore";
import { BaseError } from "../../Shared/Domain/Errors/BaseError";
import { JobUpdateError } from "../Domain/Errors/JobUpdateError";

type ExtendedJobSchemaType = jobSchemaType & {
	expiresAt: {
		_seconds: number;
		_nanoseconds: number;
	};
};

export class FireStoreJobRepository implements JobRepository {
	private firestore: firestoreInstance;
	private timeToExpireCache: number;
	constructor(firestore: firestoreInstance, timeToExpireCache: number) {
		this.firestore = firestore;
		this.timeToExpireCache = timeToExpireCache;
	}
	async get(jobID: string, userID: string) {
		try {
			const docRef = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.jobs)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userJobs)
				.doc(jobID)
				.get();
			if (!docRef.exists)
				throw new JobNotFoundError({ context: { job: jobID } });
			// The condition above should assure that data always exists.
			const { expiresAt, ...rest } = docRef.data() as ExtendedJobSchemaType;
			return rest;
		} catch (error) {
			if (error instanceof JobNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new JobNotFoundError({ error, context: { job: jobID } });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async store(job: jobSchemaType, userID: string) {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.jobs)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userJobs)
				.doc(job.id);
			await docRef.set(
				{
					...job,
					expiresAt: Timestamp.fromDate(
						new Date(Date.now() + this.timeToExpireCache),
					),
				},
				{ merge: true },
			);
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				throw new JobCreationError({ error, context: "Error storing job" });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async update(newJobInfo: JobUpdateInfo, userID: string) {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.jobs)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userJobs)
				.doc(newJobInfo.jobID);
			switch (newJobInfo.status) {
				case "successful":
					{
						const updatedJob: jobSchemaType = {
							id: newJobInfo.jobID,
							status: newJobInfo.status,
							resourceLocation: newJobInfo.resourceLocation,
						};
						await docRef.set(updatedJob);
					}
					break;
				case "failed":
					{
						const updatedJob: jobSchemaType = {
							id: newJobInfo.jobID,
							status: newJobInfo.status,
							error: newJobInfo.error,
						};
						await docRef.set(updatedJob);
					}
					break;
				default:
					exhaustiveGuard(newJobInfo);
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new JobUpdateError({ error, context: "Error storing job" });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
}
