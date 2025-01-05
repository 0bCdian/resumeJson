import type { getFirestore } from "firebase-admin/firestore";

export type firestoreInstance = ReturnType<typeof getFirestore>;
