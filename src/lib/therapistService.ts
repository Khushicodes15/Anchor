import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { TherapistConnection } from "@/types/therapist";

export const connectTherapist = async (
  userId: string,
  therapistEmail: string
) => {
  await setDoc(doc(db, "therapistConnections", userId), {
    therapistEmail,
    connectedAt: new Date(),
  });
};

export const getTherapistConnection = async (
  userId: string
): Promise<TherapistConnection | null> => {
  const snap = await getDoc(doc(db, "therapistConnections", userId));
  if (!snap.exists()) return null;
  return snap.data() as TherapistConnection;
};