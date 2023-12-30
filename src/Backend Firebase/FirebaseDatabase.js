import { app } from "./FirebaseConfig";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);
