/**
 * Admin image upload: read file(s) from device (phone/desktop), optionally compress, return data URL(s).
 * Data URLs are stored in content overrides (localStorage). Compression keeps size reasonable.
 */

const DEFAULT_MAX_WIDTH = 1400
const DEFAULT_QUALITY = 0.82

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * Compress image: resize to maxWidth, JPEG quality. Returns data URL.
 */
function compressImage(arrayBuffer, mimeType, maxWidth = DEFAULT_MAX_WIDTH, quality = DEFAULT_QUALITY) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      try {
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl)
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Image load failed'))
    }
    img.src = url
  })
}

/**
 * Read one file and return as data URL. Compresses if image to save space.
 */
export function readFileAsDataUrl(file, options = {}) {
  const { maxWidth = DEFAULT_MAX_WIDTH, quality = DEFAULT_QUALITY } = options
  const mime = (file.type || '').toLowerCase()
  const isImage = mime.startsWith('image/')

  if (!isImage) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  return readFileAsArrayBuffer(file).then((buffer) =>
    compressImage(buffer, mime, maxWidth, quality)
  )
}

/**
 * Read multiple files, return array of data URLs in same order.
 */
export function readFilesAsDataUrls(files, options = {}) {
  const fileList = Array.from(files || [])
  return Promise.all(fileList.map((file) => readFileAsDataUrl(file, options)))
}
