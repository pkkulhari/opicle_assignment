import React, { useState } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  })
  const [msg, setMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form data:', formData)

    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    console.log('Success:', formData)

    setMsg('Success! You are now signed up, check your email for a confirmation.')
  }

  return (
    <Container style={{ maxWidth: 500, marginTop: '100px' }}>
      <h1 className="mb-4">Sign Up</h1>
      {msg && <Alert variant="success">{msg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => handleChange(e as any)}
            name="name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e as any)}
            name="email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange(e as any)}
            name="phoneNumber"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </Container>
  )
}

export default Signup
