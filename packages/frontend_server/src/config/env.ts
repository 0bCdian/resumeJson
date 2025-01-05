const { ENV = "development", FIRESTORE_PROJECT_ID, PORT = 3000 } = process.env;

export const env = {
	PORT: Number(PORT),
	FIRESTORE_PROJECT_ID,
	ENV,
};
