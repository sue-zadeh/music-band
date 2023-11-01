// import React, { useState } from 'react'
// import axios from 'axios'

function ContactMe() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [errors, setErrors] = useState({})

  const handleNameChange = (e) => {
    setName(e.target.value)
    setShowPopup(false)
  }
   const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setShowPopup(false)
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }
  const validateForm = () => {
    const errors = {}

    if (!name.trim()) {
      errors.name = 'Name is required'
    }
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format'
    }

    if (!message.trim()) {
      errors.message = 'Message is required'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length === 0) {
      setName('')
      setEmail('')
      setMessage('')
      setShowPopup(true)

      try {
        const newUser = { name, email, message }

        await fetch('/api/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div>
     <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 className="h2-form">Please fill out the form</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Submit</button>
        </form>

        {showPopup && (
          <div className="popup">
            <p>
              Thank you for contacting me!
              <br />
              <br /> I will get back to you as soon as possible.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default ContactMe
