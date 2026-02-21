/**
 * Reviews: real-time Firestore listener and add review. Used when Firebase is configured.
 */
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isFirebaseEnabled } from './firebase'

const COLLECTION = 'reviews'

function mapDoc(doc) {
  const d = doc.data()
  return {
    id: doc.id,
    name: d.name ?? '',
    stars: d.stars ?? 5,
    quote: d.quote ?? '',
    image: d.image ?? null,
    createdAt: d.createdAt?.toMillis?.() ?? Date.now(),
  }
}

/**
 * Subscribe to reviews in real time. Callback receives array of reviews (newest first).
 * Returns unsubscribe function.
 */
export function subscribeReviews(callback) {
  if (!isFirebaseEnabled()) {
    callback([])
    return () => {}
  }
  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc')
  )
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map(mapDoc)
      callback(list)
    },
    (err) => {
      console.error('Firestore reviews listener error:', err)
      callback([])
    }
  )
  return unsub
}

/**
 * Add a review. Returns Promise that resolves when saved.
 */
export async function addReview({ name, stars, quote }) {
  if (!isFirebaseEnabled()) {
    throw new Error('Firebase is not configured')
  }
  await addDoc(collection(db, COLLECTION), {
    name: String(name).trim(),
    stars: Math.min(5, Math.max(1, Number(stars) || 5)),
    quote: String(quote).trim(),
    createdAt: serverTimestamp(),
  })
}

export { isFirebaseEnabled }
