import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <div className="bg-zinc-950 min-h-screen text-white font-sans">
        {/* Navigation Bar */}
        <nav className="bg-zinc-900 px-8 py-4 flex justify-center space-x-8 shadow-md border-b border-zinc-800">
          <Link to="/" className="text-lg hover:text-red-500 transition">Home</Link>
          <Link to="/login" className="text-lg hover:text-red-500 transition">Login</Link>
          <Link to="/register" className="text-lg hover:text-red-500 transition">Register</Link>
        </nav>

        {/* Page Content */}
        <main className="max-w-3xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
