import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post("/login", form)
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login to MovieFlix</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
        required
      />
      <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-bold">
        Login
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <p className="text-sm text-center mt-2">
        Don’t have an account? <a href="/register" className="text-red-400 hover:underline">Register</a>
      </p>
    </form>
  )
}
