import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

// Criação do contexto
const AuthContext = createContext();

// Hook para facilitar o uso
export function useAuth() {
  return useContext(AuthContext);
}

// Provider do contexto
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registro de novo usuário
  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      bio: "",
      age: "",
      photoURL: "",
      completedLevels: [],
      currentLevel: 1, // Começa com o nível 1 desbloqueado
      createdAt: new Date().toISOString()
    });

    return userCredential;
  }

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Atualização do perfil do usuário no Firestore e localmente
  async function updateUserProfile(data) {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, data, { merge: true });
    setUserProfile(prev => ({ ...prev, ...data }));

    if (data.name && data.name !== currentUser.displayName) {
      await updateProfile(currentUser, { displayName: data.name });
    }
  }

  // Upload da foto de perfil
  async function uploadProfilePicture(file) {
    if (!currentUser) return;

    const fileRef = ref(storage, `profilePictures/${currentUser.uid}`);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateUserProfile({ photoURL });
    return photoURL;
  }

  // Marcar um nível como concluído e desbloquear o próximo
  async function completeLevel(levelId) {
    if (!userProfile) return;

    const completedLevels = [...(userProfile.completedLevels || [])];
    if (!completedLevels.includes(levelId)) {
      completedLevels.push(levelId);
    }

    const nextLevel = Math.max(userProfile.currentLevel || 1, levelId + 1);

    await updateUserProfile({
      completedLevels,
      currentLevel: nextLevel
    });
  }

  // Buscar o perfil do usuário no banco de dados
  async function fetchUserProfile() {
    if (!currentUser) return null;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      // Preenche com valores padrão, se estiverem faltando
      if (!userData.currentLevel) userData.currentLevel = 1;
      if (!userData.completedLevels) userData.completedLevels = [];

      setUserProfile(userData);
      return userData;
    }

    return null;
  }

  // Escuta mudanças de autenticação (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserProfile();
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Valores expostos no contexto
  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    uploadProfilePicture,
    completeLevel,
    fetchUserProfile
  };

  // Fornece o contexto para a árvore de componentes
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
