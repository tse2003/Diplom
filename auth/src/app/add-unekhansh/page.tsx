'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddUneKhanshPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    baiguullaga: '',
    projectNer: '',
    bairshil: '',
    ailToo: '',
    ashiglaltOgnoo: '',
    uruuniSongolt: '',
    uruuniHemjee: '',
    une: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))

    const res = await fetch('/api/unekhansh', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Амжилттай нэмэгдлээ!')
      router.push('/unekhansh')
    } else {
      alert('Алдаа гарлаа.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Үнийн мэдээлэл нэмэх</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="baiguullaga" placeholder="Байгууллагын нэр" onChange={handleChange} required className="border p-2 rounded" />
        <input name="projectNer" placeholder="Төслийн нэр" onChange={handleChange} required className="border p-2 rounded" />
        <input name="bairshil" placeholder="Байршил" onChange={handleChange} required className="border p-2 rounded" />
        <input name="ailToo" placeholder="Айлын тоо" onChange={handleChange} required className="border p-2 rounded" />
        <input name="ashiglaltOgnoo" placeholder="Ашиглалтанд орох хугацаа" onChange={handleChange} required className="border p-2 rounded" />
        <input name="uruuniSongolt" placeholder="Өрөөний сонголт" onChange={handleChange} required className="border p-2 rounded" />
        <input name="uruuniHemjee" placeholder="Хэмжээ (м.кв)" onChange={handleChange} required className="border p-2 rounded" />
        <input name="une" placeholder="Үнэ" onChange={handleChange} required className="border p-2 rounded" />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Хадгалж байна...' : 'Хадгалах'}
        </button>
      </form>
    </div>
  )
}
