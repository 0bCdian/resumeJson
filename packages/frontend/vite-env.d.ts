/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FIREBASE_API_KEY: string;
	readonly VITE_FIREBASE_AUTH_DOMAIN: string;
	readonly VITE_FIREBASE_PROJECT_ID: string;
	readonly VITE_FIREBASE_STORAGE_BUCKET: string;
	readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
	readonly VITE_FIREBASE_APP_ID: string;
	readonly VITE_FIREBASE_AUTH_EMULATOR_HOST: string;
	readonly VITE_SERVER_HOST_DEV: string;
	readonly VITE_TESTING: "true" | "false" | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
