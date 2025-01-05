import type { User } from "./Schemas/UserSchema";

export interface UserRepository {
	get: (userID: string) => Promise<User>;
	update: (user: User) => Promise<void>;
	store: (user: User) => Promise<void>;
	delete: (userID: string) => Promise<void>;
}
