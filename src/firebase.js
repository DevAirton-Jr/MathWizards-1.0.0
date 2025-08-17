// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6vhIpmYLLeOnrb0yLJCLQRwAchjFlM2I",
  authDomain: "math-wizards-8b6bc.firebaseapp.com",
  projectId: "math-wizards-8b6bc",
  storageBucket: "math-wizards-8b6bc.appspot.com",
  messagingSenderId: "80373424290",
  appId: "1:80373424290:web:fd614e5e071ad999a377fb",
  measurementId: "G-WT86GV515H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Atualiza o perfil do usuário com o novo avatar (photoURL)
 */
export async function updateUserProfile({ photoURL }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Nenhum usuário logado");
  
  // Atualiza no Auth
  await updateProfile(user, { photoURL });
  
  // Opcional: salva no Firestore
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, { photoURL });
  
  return true;
}

export default app;