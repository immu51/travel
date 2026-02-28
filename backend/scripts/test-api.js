/**
 * Test all API endpoints. Run with: node scripts/test-api.js
 * Requires: backend server running (npm run dev) and MongoDB connected.
 */
const BASE = process.env.API_BASE_URL || 'http://localhost:5000'

async function request(method, path, body = null, token = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  if (token) opts.headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${BASE}${path}`, opts)
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

async function run() {
  const results = []
  function add(name, pass, detail) {
    results.push({ name, pass, detail })
    console.log(pass ? `  ✓ ${name}` : `  ✗ ${name}: ${detail}`)
  }

  console.log('\nTesting APIs at', BASE, '\n')

  // 1. Health (no DB required)
  try {
    const h = await request('GET', '/api/health')
    add('GET /api/health', h.status === 200 && h.data?.ok === true, h.data || h.status)
  } catch (e) {
    add('GET /api/health', false, e.message || 'Connection refused – is the server running?')
  }

  // 2. Content GET (requires DB)
  try {
    const c = await request('GET', '/api/content')
    add('GET /api/content', c.status === 200 && typeof c.data === 'object', c.status === 503 ? 'Database not available' : c.status)
  } catch (e) {
    add('GET /api/content', false, e.message)
  }

  // 3. Auth login (wrong password)
  try {
    const auth = await request('POST', '/api/auth/login', { password: 'wrong' })
    add('POST /api/auth/login (invalid)', auth.status === 200 && auth.data?.ok === false, auth.data?.reason || auth.status)
  } catch (e) {
    add('POST /api/auth/login', false, e.message)
  }

  // 4. Contact form (requires DB)
  try {
    const contact = await request('POST', '/api/contact', {
      name: 'API Test',
      email: 'test@example.com',
      phone: '9999999999',
      message: 'Test message from script',
    })
    add('POST /api/contact', contact.status === 200 && contact.data?.ok === true, contact.status === 503 ? 'Database not available' : contact.status)
  } catch (e) {
    add('POST /api/contact', false, e.message)
  }

  // 5. Booking form
  try {
    const booking = await request('POST', '/api/booking', {
      name: 'API Test',
      email: 'test@example.com',
      phone: '9999999999',
      travelDate: '2025-12-01',
      travelers: '2',
      message: 'Test booking',
    })
    add('POST /api/booking', booking.status === 200 && booking.data?.ok === true, booking.status === 503 ? 'Database not available' : booking.status)
  } catch (e) {
    add('POST /api/booking', false, e.message)
  }

  // 6. Hotel form
  try {
    const hotel = await request('POST', '/api/hotel', {
      name: 'API Test',
      email: 'test@example.com',
      phone: '9999999999',
      checkIn: '2025-12-01',
      checkOut: '2025-12-03',
      guests: '2',
      city: 'Agra',
      roomType: 'standard',
      message: 'Test hotel',
    })
    add('POST /api/hotel', hotel.status === 200 && hotel.data?.ok === true, hotel.status === 503 ? 'Database not available' : hotel.status)
  } catch (e) {
    add('POST /api/hotel', false, e.message)
  }

  // 7. Car rental form
  try {
    const car = await request('POST', '/api/car-rental', {
      name: 'API Test',
      email: 'test@example.com',
      phone: '9999999999',
      pickupDate: '2025-12-01',
      vehicle: 'sedan',
      message: 'Test car rental',
    })
    add('POST /api/car-rental', car.status === 200 && car.data?.ok === true, car.status === 503 ? 'Database not available' : car.status)
  } catch (e) {
    add('POST /api/car-rental', false, e.message)
  }

  // 8. Reviews GET
  try {
    const revGet = await request('GET', '/api/reviews')
    add('GET /api/reviews', revGet.status === 200 && Array.isArray(revGet.data), revGet.status === 503 ? 'Database not available' : revGet.status)
  } catch (e) {
    add('GET /api/reviews', false, e.message)
  }

  // 9. Reviews POST
  try {
    const revPost = await request('POST', '/api/reviews', {
      name: 'API Test User',
      stars: 5,
      quote: 'Test review from API script',
    })
    add('POST /api/reviews', revPost.status === 201 && revPost.data?.id, revPost.status === 503 ? 'Database not available' : revPost.status)
  } catch (e) {
    add('POST /api/reviews', false, e.message)
  }

  // 10. Content PUT without token -> 401
  try {
    const putNoAuth = await request('PUT', '/api/content', {})
    add('PUT /api/content (no auth → 401)', putNoAuth.status === 401, putNoAuth.status)
  } catch (e) {
    add('PUT /api/content (no auth)', false, e.message)
  }

  const passed = results.filter((r) => r.pass).length
  const failed = results.filter((r) => !r.pass).length
  console.log('\n' + passed + ' passed, ' + failed + ' failed.\n')
  process.exit(failed > 0 ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
