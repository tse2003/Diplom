import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import path from 'path'
import fs from 'fs/promises'

const uri = process.env.MONGO!
const uploadDir = path.join(process.cwd(), 'public', 'uploads')

async function getCollection() {
  const client = await MongoClient.connect(uri)
  const db = client.db()
  const collection = db.collection('medee')
  return { client, collection }
}

async function saveFile(file: File) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filename = Date.now() + '-' + file.name
  await fs.mkdir(uploadDir, { recursive: true })
  const filepath = path.join(uploadDir, filename)
  await fs.writeFile(filepath, buffer)
  return `/uploads/${filename}`
}

// GET - Get single medee
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { client, collection } = await getCollection()
  const medee = await collection.findOne({ _id: new ObjectId(params.id) })
  client.close()

  if (!medee) {
    return NextResponse.json({ error: 'Мэдээ олдсонгүй' }, { status: 404 })
  }

  return NextResponse.json({
    ...medee,
    _id: medee._id.toString(),
  })
}

// PUT - Update medee with optional image upload
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const formData = await req.formData()
  const garchig = formData.get('garchig')?.toString() || ''
  const tailbar = formData.get('tailbar')?.toString() || ''
  let imgUrl = formData.get('imgUrl')?.toString() || ''

  const image = formData.get('image') as File | null
  if (image && image.size > 0 && image.type.startsWith('image/')) {
    imgUrl = await saveFile(image)
  }

  const { client, collection } = await getCollection()

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        garchig,
        tailbar,
        imgUrl,
        ognoo: new Date(),
      },
    },
    { returnDocument: 'after' }
  )

  client.close()

  return NextResponse.json({ message: 'Амжилттай засагдлаа', updated: result })
}

// DELETE - Remove medee
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { client, collection } = await getCollection()
  await collection.deleteOne({ _id: new ObjectId(params.id) })
  client.close()

  return NextResponse.json({ message: 'Амжилттай устгалаа' })
}
