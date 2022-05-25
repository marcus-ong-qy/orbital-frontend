// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
