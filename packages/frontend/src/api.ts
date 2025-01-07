import type { User as firebaseUser } from "firebase/auth";
import type { NewApiKey, User } from "./types/api";
type params = {
	user: firebaseUser | null;
};
const isProd = import.meta.env.PROD;
const BASE_URL = isProd || import.meta.env.VITE_TESTING === "true"
	? window.location.origin
	: import.meta.env.VITE_SERVER_HOST_DEV;

export async function createApi({ user }: params): Promise<NewApiKey | null> {
	try {
		const url = `${BASE_URL}/api/keys`;
		const userToken = await user?.getIdToken();
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) return null;
		return result as NewApiKey;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function deleteApi({
	user,
	apiKeyID,
}: params & { apiKeyID: string }): Promise<boolean> {
	try {
		const url = `${BASE_URL}/api/keys/${apiKeyID}`;
		const userToken = await user?.getIdToken();
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: "application/json",
			},
		});
		return response.ok;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function createUser({ user }: params): Promise<boolean> {
	try {
		if (user === null) return false;
		const url = `${BASE_URL}/api/user`;
		const userToken = await user.getIdToken();
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: "application/json",
			},
		});
		if (response.status === 409) return true;
		return response.ok;
	} catch (error) {
		return false;
	}
}

export async function getUser({ user }: params): Promise<User | null> {
	try {
		if (!user) return null;
		const url = `${BASE_URL}/api/user`;
		const userToken = await user.getIdToken();
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) return null;
		return result as User;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function deleteUser({ user }: params): Promise<boolean> {
	try {
		const url = `${BASE_URL}/api/user`;

		const userToken = await user?.getIdToken();
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: "application/json",
			},
		});
		return response.ok;
	} catch (error) {
		console.error(error);
		return false;
	}
}
