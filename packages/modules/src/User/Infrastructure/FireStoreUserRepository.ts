import { BaseError } from "../../Shared/Domain/Errors/BaseError";
import type { firestoreInstance } from "../../Shared/Types/fireStore";
import { FIRESTORE_COLLECTIONS } from "../../Shared/Types/firestoreCollections";
import { UserDeleteError } from "../Domain/Errors/UserDeleteError";
import { UserNotFoundError } from "../Domain/Errors/UserNotFoundError";
import { UserStoreError } from "../Domain/Errors/UserStoreError";
import type { User } from "../Domain/Schemas/UserSchema";
import type { UserRepository } from "../Domain/UserRepository";

export class FireStoreUserRepository implements UserRepository {
	private firestore: firestoreInstance;
	constructor(firestore: firestoreInstance) {
		this.firestore = firestore;
	}
	async get(userID: string): Promise<User> {
		try {
			const docRef = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.users)
				.doc(userID)
				.get();
			if (!docRef.exists) throw new UserNotFoundError();
			return docRef.data() as User;
		} catch (error) {
			console.error(error);
			if (error instanceof UserNotFoundError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new UserNotFoundError({ error, context: { userID } });
			}
			throw new BaseError("Unknown error", { context: JSON.stringify(error) });
		}
	}
	async store(user: User): Promise<void> {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.users)
				.doc(user.id);
			await docRef.set(user, { merge: true });
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				throw new UserStoreError({ error, context: user });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
	async delete(userID: string): Promise<void> {
		try {
			const docRef = await this.firestore
				.collection(FIRESTORE_COLLECTIONS.users)
				.where("id", "==", userID)
				.get();
			if (docRef.empty) throw new UserDeleteError();
			for (const doc of docRef.docs) {
				doc.ref.delete();
			}
		} catch (error) {
			console.error(error);
			if (error instanceof UserDeleteError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new UserDeleteError({ error, context: { userID } });
			}
		}
	}
	async update(newUserData: User): Promise<void> {
		try {
			const docRef = this.firestore
				.collection(FIRESTORE_COLLECTIONS.users)
				.doc(newUserData.id);
			await docRef.set(newUserData, { merge: true });
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				throw new UserStoreError({ error, context: newUserData });
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
}
