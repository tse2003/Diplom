'use client'

import ImageTable from '@/components/ImageTable'
import ShineBairManager from '@/components/ShineBairManager'
import UneKhanshTable from '@/components/UneKhanshTable'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminPanel() {
  const [active, setActive] = useState<string | null>(null)
  const [pinInput, setPinInput] = useState('')
  const [verifiedTabs, setVerifiedTabs] = useState<string[]>([])
  const [pendingTab, setPendingTab] = useState<string | null>(null)
  const [medee, setMedee] = useState<any[]>([])
  const [loadingMedee, setLoadingMedee] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [editImage, setEditImage] = useState<File | null>(null)

  const navItems = [
    { name: 'Мэдээ' },
    { name: 'Үнэ ханш' },
    { name: 'Агентууд' },
    { name: 'Шинэ байр' },
  ]

  const verifyPin = () => {
    if (pinInput === '1234' && pendingTab) {
      setVerifiedTabs([...verifiedTabs, pendingTab])
      setActive(pendingTab)
      setPendingTab(null)
      setPinInput('')
    } else {
      alert('Буруу PIN код!')
    }
  }

  const deleteMedee = async (id: string) => {
    if (!confirm('Та устгахдаа итгэлтэй байна уу?')) return
    try {
      const res = await fetch(`/api/medee/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMedee(medee.filter(m => m._id !== id))
      } else {
        alert('Устгаж чадсангүй!')
      }
    } catch (err) {
      alert('Сүлжээний алдаа!')
    }
  }

  const openEditDialog = (item: any) => setEditItem(item)
  const closeEditDialog = () => { setEditItem(null); setEditImage(null) }
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value })
  }

  const saveEdit = async () => {
    const formData = new FormData()
    formData.append('garchig', editItem.garchig)
    formData.append('tailbar', editItem.tailbar)
    if (editImage) {
      formData.append('image', editImage)
    }

    const res = await fetch(`/api/medee/${editItem._id}`, {
      method: 'PUT',
      body: formData,
    })

    if (res.ok) {
      const updated = await res.json()
      setMedee(medee.map(m => m._id === editItem._id ? { ...m, ...updated.updated } : m))
      closeEditDialog()
    } else {
      alert('Засахад алдаа гарлаа!')
    }
  }

  useEffect(() => {
    if (active === 'Мэдээ') {
      setLoadingMedee(true)
      fetch('/api/medee')
        .then(res => res.json())
        .then(data => setMedee(data))
        .catch(err => console.error('Fetch error:', err))
        .finally(() => setLoadingMedee(false))
    }
  }, [active])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔒 Secure Admin</h1>
        <div className="flex items-center gap-6">
          {navItems.map(({ name }) => (
            <button
              key={name}
              onClick={() => {
                if (verifiedTabs.includes(name)) {
                  setActive(name)
                } else {
                  setPendingTab(name)
                }
              }}
              className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 ${active === name ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
            >
              {name}
            </button>
          ))}
        </div>
      </header>

      {pendingTab && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">PIN оруулна уу</h2>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="1234"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setPendingTab(null); setPinInput('') }}>Болих</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={verifyPin}>Батлах</button>
            </div>
          </div>
        </div>
      )}

      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {active || 'ЭНЭХҮҮ ХУУДСАНД АДМИН ЭРХТЭЙ ХҮМҮҮС ХАНДАХ ЭРХТЭЙГ АНХААРНА УУ!!!'}
        </h2>

        {active === 'Мэдээ' && (
          <div>
            <Link href="/Addmedee">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">➕ Нэмэх</button>
            </Link>

            {loadingMedee ? (
              <p>Уншиж байна...</p>
            ) : medee.length === 0 ? (
              <p className="text-gray-500">Одоогоор мэдээ алга байна.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow rounded-xl">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Зураг</th>
                      <th className="py-3 px-4 border-b text-left">Гарчиг</th>
                      <th className="py-3 px-4 border-b text-left">Тайлбар</th>
                      <th className="py-3 px-4 border-b text-left">Огноо</th>
                      <th className="py-3 px-4 border-b text-left">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medee.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">
                          <img src={item.imgUrl} alt="Зураг" className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="py-3 px-4 border-b font-medium">{item.garchig}</td>
                        <td className="py-3 px-4 border-b text-sm text-gray-600 line-clamp-2">{item.tailbar}</td>
                        <td className="py-3 px-4 border-b text-xs text-gray-500">{new Date(item.ognoo).toLocaleDateString('mn-MN')}</td>
                        <td className="py-3 px-4 border-b text-sm">
                          <button className="text-blue-600 hover:underline mr-2" onClick={() => openEditDialog(item)}>Засах</button>
                          <button className="text-red-600 hover:underline" onClick={() => deleteMedee(item._id)}>Устгах</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {editItem && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                  <h2 className="text-lg font-bold mb-4">📝 Мэдээ засах</h2>
                  <input
                    type="text"
                    name="garchig"
                    value={editItem.garchig}
                    onChange={handleEditChange}
                    placeholder="Гарчиг"
                    className="w-full border px-3 py-2 mb-3 rounded"
                  />
                  <textarea
                    name="tailbar"
                    value={editItem.tailbar}
                    onChange={handleEditChange}
                    placeholder="Тайлбар"
                    className="w-full border px-3 py-2 mb-3 rounded"
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                    className="w-full border px-3 py-2 mb-4 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button className="bg-gray-200 px-4 py-2 rounded" onClick={closeEditDialog}>Болих</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={saveEdit}>Хадгалах</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {active === 'Үнэ ханш' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <Link href="/add-unekhansh">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">➕ Нэмэх</button>
            </Link>
            <UneKhanshTable />
          </div>
        )}

        {active === 'Агентууд' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <Link href="/upload">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">➕ Нэмэх</button>
            </Link>
            <ImageTable />
          </div>
        )}

        {active === 'Шинэ байр' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <Link href="/addBair">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">➕ Нэмэх</button>
            </Link>
            <ShineBairManager />
          </div>
        )}
      </main>
    </div>
  )
}
