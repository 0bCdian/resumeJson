const {
	OPEN_AI_API_KEY,
	ENV = "production" as const,
	GCLOUD_PROJECT,
	DB_ID = "(default)",
} = process.env;

export const env = {
	ENV,
	GCLOUD_PROJECT,
	DB_ID,
	OPEN_AI_API_KEY,
};
