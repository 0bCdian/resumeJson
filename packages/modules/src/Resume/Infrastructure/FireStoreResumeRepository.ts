import { BaseError } from "../../Shared/Domain/Errors/BaseError";
import type { firestoreInstance } from "../../Shared/Types/fireStore";
import type { JsonResume } from "../Domain/Entities/JsonResume";
import { ResumeNotFoundError } from "../Domain/Errors/ResumeNotFoundError";
import { ResumeStoreError } from "../Domain/Errors/ResumeStoreError";
import type { ResumeRepository } from "../Domain/Ports/ResumeRepository";
import { Timestamp } from "firebase-admin/firestore";
import { FIRESTORE_COLLECTIONS } from "../../Shared/Types/firestoreCollections";

type ExtendedResumeType = JsonResume["parsedResume"] & {
	expiresAt: {
		_seconds: number;
		_nanoseconds: number;
	};
	userID: string;
};

export class FireStoreResumeRepository implements ResumeRepository {
	private firestore: firestoreInstance;
	private timeToExpireCache: number;
	constructor(firestore: firestoreInstance, timeToExpireCache: number) {
		this.firestore = firestore;
		this.timeToExpireCache = timeToExpireCache;
	}
	async get(resumeID: string, userID: string) {
		try {
			const docRef = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.resumes)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userResumes)
				.doc(resumeID)
				.get();
			if (!docRef.exists)
				throw new ResumeNotFoundError({ context: { resumeId: resumeID } });
			const { expiresAt, ...resume } = docRef.data() as ExtendedResumeType;
			return resume;
		} catch (error) {
			if (error instanceof ResumeNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ResumeNotFoundError({
					error,
					context: {
						resumeID: resumeID,
					},
				});
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async store(resume: JsonResume, userID: string) {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.resumes)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userResumes)
				.doc(resume.id);

			await docRef.set(
				{
					...resume.parsedResume,
					expiresAt: Timestamp.fromDate(
						new Date(Date.now() + this.timeToExpireCache),
					),
				},
				{ merge: true },
			);
		} catch (error) {
			if (error instanceof Error) {
				throw new ResumeStoreError({
					error,
					context: {
						resume: resume.parsedResume,
					},
				});
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
}
