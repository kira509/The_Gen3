import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white font-sans">
        {/* Navigation Bar */}
        <nav className="flex justify-center gap-8 py-6 shadow-lg border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
          <Link to="/" className="text-lg font-semibold hover:text-red-500 transition duration-300">Home</Link>
          <Link to="/login" className="text-lg font-semibold hover:text-red-500 transition duration-300">Login</Link>
          <Link to="/register" className="text-lg font-semibold hover:text-red-500 transition duration-300">Register</Link>
        </nav>

        {/* Page Content */}
        <main className="flex justify-center items-center py-12 px-4">
          <div className="w-full max-w-xl p-6 bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
