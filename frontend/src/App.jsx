import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans">
        {/* Navigation Bar */}
        <nav className="bg-zinc-900 px-8 py-4 flex justify-between items-center border-b border-zinc-800">
          <h1 className="text-xl font-bold text-red-500">🎬 MovieFlix</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-red-400 transition">Home</Link>
            <Link to="/login" className="hover:text-red-400 transition">Login</Link>
            <Link to="/register" className="hover:text-red-400 transition">Register</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
