'use client'

import { useEffect, useState } from 'react'

interface BairData {
  _id: string
  title: string
  duureg: string
  khoroo: string
  nukhtsul: string
  turul: string
  mkb: string
  mkbune: string
  niitune: string
  bairshil: string
  phone: string
  dawkhar: string
  uruu: string
  niitelsenognoo: string
  imageUrl?: string
  tailbar?: string
}

const duuregList = ['Баянзүрх', 'Сүхбаатар', 'Чингэлтэй', 'Баянгол', 'Хан-Уул', 'Сонгинохайрхан', 'Багануур', 'Налайх']
const turulList = ['Шинэ', 'Хуучин']
const dawkharList = ['1', '2', '3', '4', '5+']
const uruuList = ['1', '2', '3', '4', '5+']

export default function ZaruudPage() {
  const [bairuud, setBairuud] = useState<BairData[]>([])
  const [selected, setSelected] = useState<BairData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [duuregFilter, setDuuregFilter] = useState('Бүгд')
  const [turulFilter, setTurulFilter] = useState('Бүгд')
  const [dawkharFilter, setDawkharFilter] = useState('Бүгд')
  const [uruuFilter, setUruuFilter] = useState('Бүгд')

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

  const filtered = bairuud.filter((item) => {
    return (
      (duuregFilter === 'Бүгд' || item.duureg === duuregFilter) &&
      (turulFilter === 'Бүгд' || item.turul === turulFilter) &&
      (dawkharFilter === 'Бүгд' || item.dawkhar === dawkharFilter) &&
      (uruuFilter === 'Бүгд' || item.uruu === uruuFilter)
    )
  })

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Бүх зарууд</h1>

      {/* Шүүлтүүр хэсэг */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select className="select select-bordered" value={duuregFilter} onChange={(e) => setDuuregFilter(e.target.value)}>
          <option value="Бүгд">Дүүрэг</option>
          {duuregList.map((d) => <option key={d}>{d}</option>)}
        </select>

        <select className="select select-bordered" value={turulFilter} onChange={(e) => setTurulFilter(e.target.value)}>
          <option value="Бүгд">Төрөл</option>
          {turulList.map((t) => <option key={t}>{t}</option>)}
        </select>

        <select className="select select-bordered" value={dawkharFilter} onChange={(e) => setDawkharFilter(e.target.value)}>
          <option value="Бүгд">Давхар</option>
          {dawkharList.map((d) => <option key={d}>{d}</option>)}
        </select>

        <select className="select select-bordered" value={uruuFilter} onChange={(e) => setUruuFilter(e.target.value)}>
          <option value="Бүгд">Өрөө</option>
          {uruuList.map((u) => <option key={u}>{u}</option>)}
        </select>
      </div>

      {loading && <p>Уншиж байна...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-sm w-full cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <figure className="px-10 pt-10">
              <img
                src={item.imageUrl || '/placeholder.png'}
                alt={item.title}
                className="rounded-xl h-48 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.mkb} м² × {item.mkbune}₮</p>
              <p>Нийт: {item.niitune}₮</p>
              <div className="card-actions">
                <button className="btn btn-primary">Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {selected && (
        <dialog id="my_modal" className="modal modal-open" onClick={() => setSelected(null)}>
          <div
            className="modal-box w-[700px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-2">{selected.title}</h3>
            {selected.imageUrl && (
              <img
                src={selected.imageUrl}
                alt="Image"
                className="w-full h-52 object-cover rounded mb-3"
              />
            )}
            <p><b>Дүүрэг:</b> {selected.duureg}, {selected.khoroo}</p>
            <p><b>Талбай:</b> {selected.mkb} м²</p>
            <p><b>Нэгж үнэ:</b> {selected.mkbune}₮</p>
            <p><b>Нийт үнэ:</b> {selected.niitune}₮</p>
            <p><b>Төлөв:</b> {selected.nukhtsul}</p>
            <p><b>Төрөл:</b> {selected.turul}</p>
            <p><b>Байршил:</b> {selected.bairshil}</p>
            <p><b>Давхар:</b> {selected.dawkhar}</p>
            <p><b>Өрөө:</b> {selected.uruu}</p>
            <p><b>Утас:</b> {selected.phone}</p>
            <p><b>Нийтэлсэн огноо:</b> {selected.niitelsenognoo}</p>
            {selected.tailbar && (
              <p className="mt-2 text-gray-600 whitespace-pre-line">{selected.tailbar}</p>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setSelected(null)}>Хаах</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
