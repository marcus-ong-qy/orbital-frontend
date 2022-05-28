// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth, User, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ProfileInfo } from './store/types';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

// User management functions https://firebase.google.com/docs/auth/web/manage-users

const getUserProfile = (user: User): ProfileInfo => {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User

  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;

  const updatedUserProfile = {
    displayName: displayName,
    email: email,
    photoURL: photoURL,
    emailVerified: emailVerified,
    uid: uid,
  };

  return updatedUserProfile;
};

const logout = async () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export { auth, db, googleProvider, getUserProfile, logout };
