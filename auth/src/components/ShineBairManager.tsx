'use client'

import { useEffect, useState } from 'react'

interface ShineBairItem {
  _id: string
  title: string
  imgUrl: string
  une: string
  company: string
  phone: string
  khugatsaa: string
  angilal: string
  khiits: string
  turul: string
  tailbar: string
  ognoo: string
}

export default function ShineBairManager() {
  const [items, setItems] = useState<ShineBairItem[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const fetchItems = async () => {
    setLoading(true)
    const res = await fetch('/api/shinebair')
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    if (!image) return setMessage('Зураг заавал оруулна уу.')
    formData.append('image', image)

    const res = await fetch('/api/shinebair', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    if (res.ok) {
      setMessage('Амжилттай нэмэгдлээ!')
      form.reset()
      setImage(null)
      fetchItems() // Refresh the table
    } else {
      setMessage(result.error || 'Алдаа гарлаа')
    }
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="overflow-x-auto bg-white shadow rounded">
        <h2 className="text-lg font-semibold p-4">Бүх байрууд</h2>
        {loading ? (
          <p className="p-4">Уншиж байна...</p>
        ) : (
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Гарчиг</th>
                <th>Зураг</th>
                <th>Үнэ</th>
                <th>Компани</th>
                <th>Утас</th>
                <th>Хугацаа</th>
                <th>Ангилал</th>
                <th>Хийц</th>
                <th>Төрөл</th>
                <th>Тайлбар</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.imgUrl} alt="bair" className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td>{item.une}</td>
                  <td>{item.company}</td>
                  <td>{item.phone}</td>
                  <td>{item.khugatsaa}</td>
                  <td>{item.angilal}</td>
                  <td>{item.khiits}</td>
                  <td>{item.turul}</td>
                  <td>{item.tailbar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
