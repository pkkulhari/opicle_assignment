import { connectToDatabase } from '@/mongo'
import type { NextApiRequest, NextApiResponse } from 'next'
import sendEmail from '@/utils/sendMail'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Generate a verification token
  const verificationToken = Math.floor(Math.random() * 1000000).toString()

  // Send an email with the token
  const rootUrl = getRootUrl(req)
  const link = `${rootUrl}/api/verify?token=${verificationToken}`
  const html = `Please verify your email by clicking this link: <a href="${link}">${link}</a>`
  sendEmail(req.body.email, html)

  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('users')
    await collection.insertOne({ ...req.body, verificationToken, active: false })

    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error(error)
  }

  res.status(500).json({ error: 'Something went wrong' })
}

const getRootUrl = (req: NextApiRequest) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${protocol}://${host}`
}
