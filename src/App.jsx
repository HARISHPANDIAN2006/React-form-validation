import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })

  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!validateEmail(form.email)) errors.email = 'Email is invalid'
  if (!form.password) errors.password = 'Password is required'
  else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters'
  if (!form.confirm) errors.confirm = 'Please confirm your password'
  else if (form.confirm !== form.password) errors.confirm = 'Passwords do not match'
  if (!form.terms) errors.terms = 'You must accept the terms'

  const isValid = Object.keys(errors).length === 0

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true, terms: true })
    if (!isValid) return
    // Simulate submit
    setSubmitted(true)
  }

  return (
    <div>
      

      <h1>React Form Validation</h1>

      <div className="card form-card">
        {submitted ? (
          <div className="success">Registration successful! 🎉</div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {touched.name && errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {touched.email && errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {touched.password && errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.confirm ? 'true' : 'false'}
              />
              {touched.confirm && errors.confirm && <div className="error">{errors.confirm}</div>}
            </div>

            <div className="field checkbox-field">
              <label>
                <input
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{' '}
                I accept the terms and conditions
              </label>
              {touched.terms && errors.terms && <div className="error">{errors.terms}</div>}
            </div>

            <div className="actions">
              <button type="submit" disabled={!isValid} className="submit">
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
