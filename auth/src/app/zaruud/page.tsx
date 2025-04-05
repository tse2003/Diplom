'use client'

import { useEffect, useState } from 'react'

interface BairData {
  _id: string
  title: string
  duureg: string
  khoroo: string
  mkb: string
  mkbune: string
  niitune: string
  bairshil: string
  phone: string
  imageUrl?: string
  tailbar?: string
}

export default function ZaruudPage() {
  const [bairuud, setBairuud] = useState<BairData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<BairData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/bair')
        const data = await res.json()
        if (Array.isArray(data)) {
          setBairuud(data)
        } else {
          setError('Мэдээлэл олдсонгүй')
        }
      } catch (err) {
        setError('Алдаа гарлаа')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Бүх зарууд</h1>

      {loading && <p>Уншиж байна...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {bairuud.map((item) => (
          <div
            key={item._id}
            className="border rounded p-4 bg-white shadow cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelected(item)}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>Дүүрэг: {item.duureg}, {item.khoroo}</p>
            <p>Талбай: {item.mkb} м² × {item.mkbune}₮</p>
            <p>Нийт үнэ: {item.niitune}₮</p>
          </div>
        ))}
      </div>

      {/* DaisyUI Dialog */}
      {selected && (
        <dialog id="detail_modal" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-md p-0 overflow-hidden">
            <div className="card bg-base-100 shadow-sm w-full">
              <figure>
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="object-cover w-full h-52"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{selected.title}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Дүүрэг:</strong> {selected.duureg}, {selected.khoroo}<br />
                  <strong>Талбай:</strong> {selected.mkb} м² × {selected.mkbune}₮<br />
                  <strong>Нийт үнэ:</strong> {selected.niitune}₮<br />
                  <strong>Байршил:</strong> {selected.bairshil}<br />
                  <strong>Утас:</strong> {selected.phone}
                </p>
                {selected.tailbar && (
                  <p className="text-gray-500 mt-2 text-sm">{selected.tailbar}</p>
                )}
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn"
                    onClick={() => setSelected(null)}
                  >
                    Хаах
                  </button>
                  <button className="btn btn-primary">Залгах</button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
