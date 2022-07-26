// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, User } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { FirebaseProfile, RealtimeUserData } from './store/authentication/types'
import { getFunctions } from 'firebase/functions'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const functions = getFunctions(app)

// Get a reference to the database service
const database = getDatabase(app)

const googleProvider = new GoogleAuthProvider()

// User management functions https://firebase.google.com/docs/auth/web/manage-users

const setRealtimeDatabase = async (data: RealtimeUserData) => {
  await set(ref(database, 'users/' + data.uid), {
    ...data,
  })
}

const createChat = async (currentUserUID: string, targetUserUID: string) => {
  const chatUUID = crypto.randomUUID()

  await set(ref(database, 'chats/' + chatUUID), {
    createdAt: Date.now(),
    createdBy: currentUserUID,
    id: chatUUID,
    members: {
      0: currentUserUID,
      1: targetUserUID,
    },
  })
}

const sendMessage = (message: string, senderUID: string, chatUUID: string) => {
  const messageUUID = crypto.randomUUID()

  return new Promise(() =>
    set(ref(database, `messages/${chatUUID}/${messageUUID}`), {
      id: messageUUID,
      messageText: message,
      sentAt: Date.now(),
      sentBy: senderUID,
    }),
  )
}

// const getAllChatsByUserUID = (userUID: string) => {
//   return new Promise((resolve, reject) => {
//     const groupRef = database.collection('group')

//     groupRef
//      .where('members', 'array-contains', uid)
//      .onSnapshot((querySnapshot) => {
//        const allGroups = []
//        querySnapshot.forEach((doc) => {
//          const data = doc.data()
//          data.id = doc.id
//          if (data.recentMessage) allGroups.push(data)
//        })
//      })
//    })
// }

// const getAllMessagesByChatUUID = (chatUUID: string) => {

// }

const getUserFirebaseProfile = (user: User): FirebaseProfile => {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User

  // The user object has basic properties such as display name, email, etc.
  // const displayName = user.displayName
  const email = user.email
  // const photoURL = user.photoURL
  const emailVerified = user.emailVerified

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid

  const updatedUserProfile = {
    // displayName: displayName,
    email: email,
    // photoURL: photoURL,
    emailVerified: emailVerified,
    uid: uid,
  }

  return updatedUserProfile
}

export { auth, database, setRealtimeDatabase, googleProvider, getUserFirebaseProfile, functions }
