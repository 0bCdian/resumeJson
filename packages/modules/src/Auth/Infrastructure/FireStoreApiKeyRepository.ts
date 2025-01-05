import type { ApiKeyRepository } from "../Domain/ApiKeyRepository";
import type { ApiKey } from "../Domain/ApiKeySchema";
import type { firestoreInstance } from "../../Shared/Types/fireStore";
import { FIRESTORE_COLLECTIONS } from "../../Shared/Types/firestoreCollections";
import { ApiKeyStoringError } from "../Domain/Errors/ApiKeyStoringError";
import { ApiKeyDeleteError } from "../Domain/Errors/ApiKeyDeleteError";
import { ApiKeyNotFoundError } from "../Domain/Errors/ApiKeyNotFoundError";
import { BaseError } from "../../Shared/Domain/Errors/BaseError";

export class FireStoreApiKeyRepository implements ApiKeyRepository {
	private firestore: firestoreInstance;

	constructor(firestoreInstance: firestoreInstance) {
		this.firestore = firestoreInstance;
	}
	async store(apiKey: ApiKey): Promise<void> {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.apis)
				.doc(apiKey.userId)
				.collection(FIRESTORE_COLLECTIONS.userApis)
				.doc(apiKey.id);
			await docRef.set(apiKey, { merge: true });
		} catch (error) {
			if (error instanceof ApiKeyStoringError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ApiKeyStoringError({ error });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async get(apiKeyID: string): Promise<ApiKey> {
		try {
			const snapshot = await this.firestore
				.collectionGroup(FIRESTORE_COLLECTIONS.userApis)
				.get();
			const results: ApiKey[] = [];
			for (const doc of snapshot.docs) {
				const currentApi = doc.data() as ApiKey;
				if (apiKeyID === currentApi.id) {
					results.push(currentApi);
					break;
				}
			}
			if (results.length < 1) throw new ApiKeyNotFoundError();
			return results[0];
		} catch (error) {
			if (error instanceof ApiKeyNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ApiKeyNotFoundError({ error });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async getUserApi(apiKeyID: string, userID: string): Promise<ApiKey> {
		try {
			const snapshot = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.apis)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userApis)
				.doc(apiKeyID)
				.get();

			if (!snapshot.exists) {
				throw new ApiKeyNotFoundError();
			}

			return snapshot.data() as ApiKey;
		} catch (error) {
			if (error instanceof ApiKeyNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ApiKeyNotFoundError({ error });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async getAll(userID: string): Promise<ApiKey[]> {
		try {
			const snapshot = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.apis)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userApis)
				.orderBy("createdAt", "asc")
				.get();

			const apiKeys = snapshot.docs.map((doc) => doc.data() as ApiKey);
			if (apiKeys.length < 1) {
				throw new ApiKeyNotFoundError();
			}
			return apiKeys;
		} catch (error) {
			if (error instanceof ApiKeyNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ApiKeyNotFoundError({ error });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async delete(apiKeyID: string, userID: string): Promise<void> {
		try {
			const docRef = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.apis)
				.doc(userID)
				.collection(FIRESTORE_COLLECTIONS.userApis)
				.doc(apiKeyID)
				.get();
			if (!docRef.exists) throw new ApiKeyDeleteError();
			await docRef.ref.delete();
		} catch (error) {
			if (error instanceof ApiKeyDeleteError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new ApiKeyDeleteError({ error });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
}
