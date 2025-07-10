import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await API.post("/auth/register", { username, email, password })
      navigate("/login")
    } catch (err) {
      alert("Registration failed. Try again with different credentials.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-zinc-900 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Create MovieFlix Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
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
          Register
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account? <a href="/login" className="text-red-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  )
}
