const {
	ENV = "development",
	FIRESTORE_PROJECT_ID,
	PORT = 3000,
	DB_ID = "(default)",
	GCLOUD_PROJECT,
} = process.env;

export const env = {
	PORT: Number(PORT),
	FIRESTORE_PROJECT_ID,
	GCLOUD_PROJECT,
	ENV,
	DB_ID,
};
