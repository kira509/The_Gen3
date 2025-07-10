import { useState } from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (err) {
      alert("Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to MovieFlix</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-bold"
        >
          Login
        </button>
        <p className="mt-3 text-sm text-center">
          No account? <a href="/register" className="text-red-400 hover:underline">Register</a>
        </p>
      </form>
    </div>
  )
}
