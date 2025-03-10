import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    // J'ai besoin de vos clés Firebase pour configurer ceci
    // Pouvez-vous me fournir les informations de configuration de votre projet Firebase ?
    // Ces informations se trouvent dans les paramètres de votre projet Firebase
    // Elles ressemblent à ceci :
    // apiKey: "votre-api-key",
    // authDomain: "votre-project.firebaseapp.com",
    // projectId: "votre-project-id",
    // storageBucket: "votre-project.appspot.com",
    // messagingSenderId: "votre-messaging-sender-id",
    // appId: "votre-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;