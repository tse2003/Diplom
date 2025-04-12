'use client'

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

  const navItems = [
    { name: 'Мэдээ' },
    { name: 'Үнэ ханш' },
    { name: 'Оффис & агентууд' },
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

  // Fetch медээ when "Мэдээ" tab is active
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
      {/* Top Navbar */}
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
              className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 ${
                active === name ? 'text-green-600 font-semibold' : 'text-gray-600'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </header>

      {/* PIN Dialog */}
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
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => {
                  setPendingTab(null)
                  setPinInput('')
                }}
              >
                Болих
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={verifyPin}
              >
                Батлах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {active || 'ЭНЭХҮҮ ХУУДСАНД АДМИН ЭРХТЭЙ ХҮМҮҮС ХАНДАХ ЭРХТЭЙГ АНХААРНА УУ!!!'}
        </h2>

        {/* --- Мэдээ --- */}
        {active === 'Мэдээ' && (
          <div>
            <Link href="/Addmedee">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
                ➕ Мэдээ нэмэх
              </button>
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
                      <th className="py-3 px-4 border-b text-left">Гарчиг</th>
                      <th className="py-3 px-4 border-b text-left">Тайлбар</th>
                      <th className="py-3 px-4 border-b text-left">Огноо</th>
                      <th className="py-3 px-4 border-b text-left">Зураг</th>
                      <th className="py-3 px-4 border-b text-left">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medee.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b font-medium">{item.garchig}</td>
                        <td className="py-3 px-4 border-b text-sm text-gray-600 line-clamp-2">{item.tailbar}</td>
                        <td className="py-3 px-4 border-b text-xs text-gray-500">
                          {new Date(item.ognoo).toLocaleDateString('mn-MN')}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <img src={item.imgUrl} alt="Зураг" className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="py-3 px-4 border-b text-sm">
                          <button className="text-blue-600 hover:underline mr-2">Засах</button>
                          <button className="text-red-600 hover:underline">Устгах</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- Үнэ ханш --- */}
        {active === 'Үнэ ханш' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">Үнийн мэдээлэл</h1>
            <Link href="/add-unekhansh">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
              ➕ Мэдээ нэмэх
            </button>
            </Link>
              <UneKhanshTable />
            </div>
        )}

        {/* --- Оффис & агентууд --- */}
        {active === 'Оффис & агентууд' && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Оффисууд</h3>
            <p className="text-sm text-gray-500">(Оффис, агентуудын жагсаалт)</p>
          </div>
        )}
      </main>
    </div>
  )
}
