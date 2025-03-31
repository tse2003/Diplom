'use client'

import { useState } from 'react'

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!image || !name || !phone) return alert('Fill all fields')

    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', name)
    formData.append('phone', phone)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (data.imageUrl) {
      setUploadedUrl(data.imageUrl)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div>
          <p>Uploaded:</p>
          <img src={uploadedUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  )
}
