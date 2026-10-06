import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Cube from './Cube'
import { ChevronLeft, ImagePlus } from 'lucide-react'

const FACES = [
  { id: 'U', name: 'Top', color: '#FFFFFF' },
  { id: 'L', name: 'Left', color: '#FF5800' },
  { id: 'F', name: 'Front', color: '#009B48' },
  { id: 'R', name: 'Right', color: '#B71234' },
  { id: 'B', name: 'Back', color: '#0046AD' },
  { id: 'D', name: 'Bottom', color: '#FFD500' },
]

const slots = FACES.flatMap((face) =>
  Array.from({ length: 9 }, (_, index) => ({
    ...face,
    key: `${face.id}-${Math.floor(index / 3)}-${index % 3}`,
    index: index + 1,
  })),
)

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cube-gallery', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('images')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function readImages() {
  const db = await openImageDatabase()
  return new Promise((resolve, reject) => {
    const request = db.transaction('images').objectStore('images').getAll()
    request.onsuccess = () => {
      const keys = request.transaction.objectStore('images').getAllKeys()
      keys.onsuccess = () => resolve(Object.fromEntries(keys.result.map((key, i) => [key, request.result[i]])))
      keys.onerror = () => reject(keys.error)
    }
    request.onerror = () => reject(request.error)
  }).finally(() => db.close())
}

async function saveProjectImage(key, blob) {
  const response = await fetch(`/api/gallery/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': blob.type || 'application/octet-stream' },
    body: blob,
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Could not save image to the project.')
  return result.url
}

async function createCubeTexture(blob) {
  const bitmap = await createImageBitmap(blob)
  const scale = Math.min(1, 384 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return new Promise((resolve, reject) => {
    canvas.toBlob((preview) => preview ? resolve(preview) : reject(new Error('Could not create cube texture.')), 'image/webp', 0.82)
  })
}

async function saveProjectTexture(key, blob) {
  const response = await fetch(`/api/gallery/texture/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/webp' },
    body: blob,
  })
  if (!response.ok) throw new Error('Could not save the optimized cube texture.')
}

async function saveLocalImage(key, blob) {
  const db = await openImageDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite')
    transaction.objectStore('images').put(blob, key)
    transaction.oncomplete = resolve
    transaction.onerror = () => reject(transaction.error)
  }).finally(() => db.close())
}

async function loadProjectImages() {
  let images
  let canWriteProject = false
  try {
    const response = await fetch('/api/gallery')
    if (!response.ok) throw new Error('Project image API is unavailable.')
    images = await response.json()
    canWriteProject = true
  } catch {
    const response = await fetch('/gallery/manifest.json')
    if (!response.ok) throw new Error('Could not load the project gallery manifest.')
    images = await response.json()
  }

  if (canWriteProject) {
    const legacyImages = await readImages().catch(() => ({}))
    const pendingMigration = []
    const shouldMigrateLegacy = Object.keys(images).length === 0
    for (const [key, blob] of Object.entries(legacyImages)) {
      const isProjectImage = Boolean(images[key])
      if (isProjectImage || shouldMigrateLegacy) {
        images[key] = URL.createObjectURL(blob)
        if (!isProjectImage) pendingMigration.push([key, blob])
      }
    }

    void (async () => {
      for (const [key, blob] of pendingMigration) {
        try {
          await saveProjectImage(key, blob)
          await saveProjectTexture(key, await createCubeTexture(blob))
        } catch (error) {
          console.error(`Could not migrate gallery image ${key}`, error)
        }
      }
    })()
  }

  return images
}

function Pocket({ slot, image, galleryOpen, onUpload, onPreview }) {
  const inputRef = useRef(null)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file?.type.startsWith('image/')) await onUpload(slot.key, file)
  }

  return (
    <div className={`pocket ${image ? 'has-image' : ''}`} style={{ '--pocket-color': slot.color }}>
      {image ? (
        <button className="pocket-image" onClick={() => onPreview(image.url, `${slot.name} ${slot.index}`)} aria-label={`View ${slot.name} pocket ${slot.index}`}>
          <img
            src={galleryOpen ? image.previewUrl : undefined}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              const img = event.currentTarget
              if (!img.dataset.fallbackAttempted) {
                img.dataset.fallbackAttempted = 'true'
                img.src = image.url
              }
            }}
          />
        </button>
      ) : (
        <button className="pocket-empty" onClick={() => inputRef.current?.click()} aria-label={`Add image to ${slot.name} pocket ${slot.index}`}>
          <ImagePlus size={19} strokeWidth={1.6} />
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
    </div>
  )
}

export default function App({ onClose }) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [playMode, setPlayMode] = useState(false)
  const [galleryLoaded, setGalleryLoaded] = useState(false)
  const [texturesReady, setTexturesReady] = useState(false)
  const [storedImages, setStoredImages] = useState({})
  const [preview, setPreview] = useState(null)
  const [textures, setTextures] = useState({})
  const cubeRef = useRef(null)

  useEffect(() => {
    loadProjectImages()
      .then((images) => {
        setTexturesReady(Object.keys(images).length === 0)
        setStoredImages(images)
        setGalleryLoaded(true)
      })
      .catch((error) => {
        console.error('Could not load gallery images', error)
        setTexturesReady(true)
        setGalleryLoaded(true)
      })
  }, [])

  useEffect(() => {
    const loaded = []
    const loader = new THREE.TextureLoader()
    const entries = Object.entries(storedImages)
    let pending = entries.length
    let cancelled = false
    setTexturesReady(pending === 0)
    entries.forEach(async ([key, url]) => {
      try {
        let texture
        try {
          texture = await loader.loadAsync(`/gallery/textures/${key}.webp`)
        } catch {
          texture = await loader.loadAsync(url)
        }
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 4
        const aspect = texture.image.width / texture.image.height
        if (aspect > 1) {
          texture.repeat.x = 1 / aspect
          texture.offset.x = (1 - texture.repeat.x) / 2
        } else if (aspect < 1) {
          texture.repeat.y = aspect
          texture.offset.y = (1 - texture.repeat.y) / 2
        }
        if (cancelled) {
          texture.dispose()
          return
        }
        loaded.push(texture)
        setTextures((current) => ({ ...current, [key]: texture }))
      } catch (error) {
        if (!cancelled) console.error(`Could not load cube image texture ${key}`, error)
      } finally {
        pending -= 1
        if (!cancelled && pending === 0) setTexturesReady(true)
      }
    })
    return () => {
      cancelled = true
      loaded.forEach((texture) => texture.dispose())
    }
  }, [storedImages])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (preview) {
          setPreview(null)
        } else if (galleryOpen) {
          setGalleryOpen(false)
        } else if (playMode) {
          cubeRef.current?.reset()
          setPlayMode(false)
        } else if (onClose) {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [preview, galleryOpen, playMode, onClose])

  const upload = useCallback(async (key, blob) => {
    try {
      const url = await saveProjectImage(key, blob)
      try {
        await saveProjectTexture(key, await createCubeTexture(blob))
      } catch (error) {
        console.error('Could not save optimized cube texture', error)
      }
      void saveLocalImage(key, blob).catch((error) => console.error('Could not cache gallery image', error))
      setStoredImages((current) => ({ ...current, [key]: url }))
    } catch (error) {
      console.error('Could not save gallery image', error)
    }
  }, [])

  const photosReady = galleryLoaded && texturesReady

  return (
    <main className={`app ${galleryOpen ? 'gallery-open' : ''} ${!playMode && !photosReady ? 'photos-loading' : ''}`}>
      <Canvas camera={{ position: [7, 6, 9], fov: 38 }} dpr={[1, 2]}>
        <color attach="background" args={['#131313']} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[5, 9, 7]} intensity={1.35} />
        <directionalLight position={[-6, -4, -5]} intensity={0.3} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={1.1} position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" intensity={1.1} position={[6, 1, 3]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
        </Environment>
        <Cube
          ref={cubeRef}
          images={playMode ? {} : textures}
          onOpen={playMode ? undefined : () => setGalleryOpen(true)}
        />
        <ContactShadows position={[0, -2.4, 0]} opacity={0.45} scale={12} blur={2.8} far={4} />
        <OrbitControls makeDefault enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} rotateSpeed={0.8} />
      </Canvas>

      {playMode && !galleryOpen && (
        <button className="gallery-back" onClick={() => {
          cubeRef.current?.reset()
          setPlayMode(false)
        }} aria-label="Back to image cube"><ChevronLeft size={32} strokeWidth={3} /></button>
      )}

      {!galleryOpen && !playMode && (
        <>
          {onClose && (
            <button
              className="gallery-back portfolio-back"
              onClick={onClose}
              aria-label="Back to portfolio"
              title="Back to portfolio"
            >
              <ChevronLeft size={32} strokeWidth={3} />
            </button>
          )}
          <button className="open-cube" onClick={() => setGalleryOpen(true)}><span className="open-cube-label">Open cube <span className="open-cube-arrow" aria-hidden="true">&gt;</span></span></button>
          <button className="open-cube play-cube" onClick={() => setPlayMode(true)}><span className="open-cube-label">Wanna PLay?</span></button>
        </>
      )}

      {playMode && !galleryOpen && (
        <button className="open-cube" onClick={() => cubeRef.current?.scramble(40)}>
          <span className="open-cube-label">Scramble</span>
        </button>
      )}

      <section className={`gallery-panel ${galleryOpen ? 'is-open' : ''}`} aria-hidden={!galleryOpen}>
        <button className="gallery-back" onClick={() => setGalleryOpen(false)} aria-label="Back to cube"><ChevronLeft size={32} strokeWidth={3} /></button>
        <div className="net-layout">
          {FACES.map((face) => (
            <section key={face.id} className={`face face-${face.id.toLowerCase()}`}>
              {slots.filter((slot) => slot.id === face.id).map((slot) => (
                <Pocket
                  key={slot.key}
                  slot={slot}
                  image={storedImages[slot.key] ? { url: storedImages[slot.key], previewUrl: `/gallery/textures/${slot.key}.webp` } : null}
                  galleryOpen={galleryOpen}
                  onUpload={upload}
                  onPreview={(url, title) => setPreview({ url, title })}
                />
              ))}
            </section>
          ))}
        </div>
      </section>

      {preview && (
        <div className="preview-overlay" role="dialog" aria-label="Image preview">
          <div className="preview-stage">
            <button className="gallery-back preview-back" onClick={() => setPreview(null)} aria-label="Back to cube gallery"><ChevronLeft size={32} strokeWidth={3} /></button>
            <figure>
              <img src={preview.url} alt={preview.title} />
            </figure>
          </div>
        </div>
      )}
    </main>
  )
}