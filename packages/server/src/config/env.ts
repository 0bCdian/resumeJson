const {
	OPEN_AI_API_KEY,
	FIRESTORE_PROJECT_ID,
	ENV = "development" as const,
} = process.env;

export const env = {
	ENV,
	OPEN_AI_API_KEY,
	FIRESTORE_PROJECT_ID,
};
