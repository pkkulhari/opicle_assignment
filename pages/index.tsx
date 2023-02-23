import { Container, Table } from 'react-bootstrap'
import { connectToDatabase } from '@/mongo'

export default function Home({ users }: any) {
  return (
    <Container style={{ marginTop: '50px' }}>
      <div className="d-flex justify-content-between mb-4">
        <h1>Users</h1>
        <a href="/signup" className="btn btn-primary" style={{ height: 'fit-content' }}>
          Sign Up
        </a>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase()
  const data = await db.collection('users').find({}).toArray()

  return {
    props: {
      users: JSON.parse(JSON.stringify(data)),
    },
  }
}
