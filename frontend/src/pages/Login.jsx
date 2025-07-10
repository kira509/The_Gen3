import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/login`, form)
      localStorage.setItem("token", res.data.token)
      navigate("/") // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to MovieFlix</h2>
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
          className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-bold"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
        <p className="mt-3 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-red-400 hover:underline">Register</a>
        </p>
      </form>
    </div>
  )
}

export default Login
