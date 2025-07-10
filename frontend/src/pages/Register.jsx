import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/auth/register`, form)
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleRegister} className="bg-zinc-900 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Create MovieFlix Account</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-bold"
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  )
}

export default Register
