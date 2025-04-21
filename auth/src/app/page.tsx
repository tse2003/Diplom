'use client'

import { useEffect, useState } from 'react'
import CommentSection from '@/components/CommentSection'
import MedeeCommentSection from '@/components/MedeeCommentSection'

interface ShineBair {
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

interface OntslokhZar {
  _id: string
  imageUrl: string
  title: string
  tailbar: string
  phone: string
  bairshil: string
  mkb: string
  mkbune: string
  niitune: string
  dawkhar: string
  uruu: string
}

interface Medee {
  _id: string
  garchig: string
  imgUrl: string
  tailbar: string
  ognoo: string
}

export default function Home() {
  const [items, setItems] = useState<ShineBair[]>([])
  const [selected, setSelected] = useState<ShineBair | null>(null)
  const [featured, setFeatured] = useState<OntslokhZar[]>([])
  const [highlight, setHighlight] = useState<OntslokhZar | null>(null)
  const [medeenud, setMedeenuud] = useState<Medee[]>([])
  const [selectedMedee, setSelectedMedee] = useState<Medee | null>(null)

  useEffect(() => {
    fetch('/api/shinebair')
      .then((res) => res.json())
      .then((data) => setItems(data))

    fetch('/api/bair')
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 4)))

    fetch('/api/medee')
      .then((res) => res.json())
      .then((data) => setMedeenuud(data.slice(0, 4)))
  }, [])

  return (
    <div className="m-auto w-[900px] bg-slate-100 py-6 px-4 rounded">
      <h1 className="text-2xl font-bold text-center pb-4">ШИНЭ ОРОН СУУЦУУД</h1>

      <div className="carousel w-full h-[400px] rounded-box mb-4">
        {items.slice(0, 4).map((item, index) => (
          <div key={item._id} id={`item${index}`} className="carousel-item relative w-full">
            <img src={item.imgUrl} className="w-full h-full object-cover rounded" />
            <button
              onClick={() => setSelected(item)}
              className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-3 py-1 text-sm font-semibold rounded shadow"
            >
              Дэлгэрэнгүй
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {items.slice(0, 4).map((_, index) => (
          <a key={index} href={`#item${index}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>

      {selected && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg">{selected.title}</h3>
            <img src={selected.imgUrl} alt="img" className="w-full h-auto max-h-[500px] object-contain my-2 rounded" />
            <div className="text-sm space-y-1">
              <p><strong>Үнэ:</strong> {selected.une}</p>
              <p><strong>Компани:</strong> {selected.company}</p>
              <p><strong>Утас:</strong> {selected.phone}</p>
              <p><strong>Хугацаа:</strong> {selected.khugatsaa}</p>
              <p><strong>Төрөл:</strong> {selected.turul}</p>
              <p><strong>Ангилал:</strong> {selected.angilal}</p>
              <p><strong>Хийц:</strong> {selected.khiits}</p>
              <p className="pt-2 whitespace-pre-line">{selected.tailbar}</p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelected(null)}>Хаах</button>
            </div>
          </div>
        </dialog>
      )}

      <h1 className="text-2xl font-bold text-center pb-4 pt-8">ОНЦЛОХ ЗАРУУД</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={item.imageUrl} alt={item.title} className="w-full h-60 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.bairshil}</p>
              <p>{item.niitune}₮ - {item.mkb}м²</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary" onClick={() => setHighlight(item)}>Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {highlight && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">{highlight.title}</h3>
            <img src={highlight.imageUrl} className="w-full h-auto max-h-[500px] object-contain my-2 rounded" />
            <div className="text-sm space-y-1">
              <p><strong>Байршил:</strong> {highlight.bairshil}</p>
              <p><strong>Нийт үнэ:</strong> {highlight.niitune}₮</p>
              <p><strong>1м² үнэ:</strong> {highlight.mkbune}₮</p>
              <p><strong>Мкв хэмжээ:</strong> {highlight.mkb}м²</p>
              <p><strong>Өрөө:</strong> {highlight.uruu}</p>
              <p><strong>Давхар:</strong> {highlight.dawkhar}</p>
              <p><strong>Утас:</strong> {highlight.phone}</p>
              <p className="pt-2 whitespace-pre-line">{highlight.tailbar}</p>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-base mb-2">Сэтгэгдэл</h4>
              <CommentSection bairId={highlight._id} />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setHighlight(null)}>Хаах</button>
            </div>
          </div>
        </dialog>
      )}

      <h1 className="text-2xl font-bold text-center pb-4 pt-8">ОНЦЛОХ МЭДЭЭНҮҮД</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medeenud.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={item.imgUrl} alt={item.garchig} className="w-full h-60 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.garchig}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary" onClick={() => setSelectedMedee(item)}>Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMedee && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">{selectedMedee.garchig}</h3>
            <img src={selectedMedee.imgUrl} className="w-full h-auto max-h-[500px] object-contain my-2 rounded" />
            <p className="text-sm whitespace-pre-line">{selectedMedee.tailbar}</p>
            <div className="mt-6">
              <MedeeCommentSection medeeId={selectedMedee._id} />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedMedee(null)}>Хаах</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
