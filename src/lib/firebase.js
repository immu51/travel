/**
 * Firebase app and Firestore. Only initializes when VITE_FIREBASE_API_KEY is set.
 */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app = null
let db = null

if (config.apiKey && config.projectId) {
  app = initializeApp(config)
  db = getFirestore(app)
}

export { db }
export const isFirebaseEnabled = () => !!db
