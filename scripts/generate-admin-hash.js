/**
 * Generate SHA-256 hash for admin password. Use in .env as VITE_ADMIN_PASSWORD_HASH
 * Run: node scripts/generate-admin-hash.js "yourPassword"
 */
const crypto = require('crypto')

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/generate-admin-hash.js "yourPassword"')
  process.exit(1)
}

const hash = crypto.createHash('sha256').update(password, 'utf8').digest('hex')
console.log('Add this to your .env file:\n')
console.log('VITE_ADMIN_PASSWORD_HASH=' + hash)
console.log('\nThen restart the dev server (npm run dev).')
