import { initializeApp } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
const app = initializeApp({
    projectId: "test",
  }, "test");

export const db = getFirestore(app);
db.settings({
    host: "localhost:8080",
    ssl: false,
});
