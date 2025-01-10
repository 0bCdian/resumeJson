const {
	OPEN_AI_API_KEY,
	FIRESTORE_PROJECT_ID,
	ENV = "development" as const,
GCLOUD_PROJECT,
DB_URL="localhost:8080"
} = process.env;

export const env = {
	ENV,
  GCLOUD_PROJECT,
  DB_URL,
	OPEN_AI_API_KEY,
	FIRESTORE_PROJECT_ID,
};
