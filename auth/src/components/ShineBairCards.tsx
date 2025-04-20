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

export default function ShineBairCards() {
  const [items, setItems] = useState<ShineBairItem[]>([])
  const [selected, setSelected] = useState<ShineBairItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/shinebair')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='vmax-w-7xl mx-auto p-6'>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading && <p>Уншиж байна...</p>}

        {items.map((item) => (
          <div
            key={item._id}
            className="card bg-white shadow-xl hover:shadow-2xl cursor-pointer transition h-full"
            onClick={() => setSelected(item)}
          >
            <figure className="h-64 w-full">
              <img src={item.imgUrl} alt={item.title} className="w-full h-full object-cover rounded-t-xl" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>Үнэ: {item.une}</p>
              <p className="text-sm text-gray-500">{item.company}</p>
            </div>
          </div>
        ))}

        {/* Dialog */}
        {selected && (
          <dialog id="shinebair-dialog" className="modal modal-open">
            <div className="modal-box w-full max-w-3xl">
              <h3 className="font-bold text-xl mb-3">{selected.title}</h3>
              <div className="w-full h-[400px] mb-4 overflow-hidden rounded-xl">
                <img src={selected.imgUrl} alt="dialog img" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1 text-sm">
                <p><strong>Үнэ:</strong> {selected.une}</p>
                <p><strong>Компани:</strong> {selected.company}</p>
                <p><strong>Утас:</strong> {selected.phone}</p>
                <p><strong>Хугацаа:</strong> {selected.khugatsaa}</p>
                <p><strong>Ангилал:</strong> {selected.angilal}</p>
                <p><strong>Хийц:</strong> {selected.khiits}</p>
                <p><strong>Төрөл:</strong> {selected.turul}</p>

                {/* Tailbar with new lines shown properly */}
                <p>
                  <strong>Тайлбар:</strong>{' '}
                  <span className="whitespace-pre-line">{selected.tailbar}</span>
                </p>
              </div>
              <div className="modal-action">
                <button onClick={() => setSelected(null)} className="btn">Хаах</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  )
}
