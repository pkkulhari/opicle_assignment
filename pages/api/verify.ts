import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ message: 'Verification token is required' })
  }

  try {
    const { client, db } = await connectToDatabase()
    // Find the user with the matching verification token
    const user = await db.collection('users').findOne({ verificationToken: token })

    if (!user) {
      throw new Error('Invalid verification token')
    }

    // Update the user's active field to true and remove the verification token
    const result = await db
      .collection('users')
      .updateOne({ _id: user._id }, { $set: { active: true }, $unset: { verificationToken: '' } })

    if (result.modifiedCount !== 1) {
      throw new Error('Failed to verify email address')
    }

    // Close the database connection
    client.close()

    // Return a success message
    return res.status(200).json({ message: 'Email address verified successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to verify email address' })
  }
}
