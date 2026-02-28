/**
 * Generate SHA-256 hash of admin password for backend/.env ADMIN_PASSWORD_HASH.
 * Run from backend folder: node scripts/generate-admin-hash.js "yourPassword"
 */
import crypto from 'crypto'
const password = process.argv[2] ?? ''
const hash = crypto.createHash('sha256').update(password, 'utf8').digest('hex')
console.log('ADMIN_PASSWORD_HASH=' + hash)
