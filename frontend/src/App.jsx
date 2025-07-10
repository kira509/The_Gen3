import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans">
        {/* Navigation Bar */}
        <nav className="bg-zinc-900 p-4 flex justify-center gap-6 border-b border-zinc-800">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/login" className="hover:text-red-500 transition">Login</Link>
          <Link to="/register" className="hover:text-red-500 transition">Register</Link>
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
