import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom" import Login from "./pages/Login" import Register from "./pages/Register" import Home from "./pages/Home"

function App() { return ( <Router> <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-black to-[#090909] text-white font-sans"> {/* Neon Navigation Bar */} <nav className="flex justify-center gap-10 py-6 border-b border-cyan-500/30 shadow-cyan-500/20 shadow-sm backdrop-blur-md sticky top-0 z-50"> <Link to="/" className="text-lg tracking-widest text-cyan-400 hover:text-white transition duration-300 hover:scale-105">Home</Link> <Link to="/login" className="text-lg tracking-widest text-cyan-400 hover:text-white transition duration-300 hover:scale-105">Login</Link> <Link to="/register" className="text-lg tracking-widest text-cyan-400 hover:text-white transition duration-300 hover:scale-105">Register</Link> </nav>

{/* Page Content */}
    <main className="flex justify-center items-center py-12 px-4 min-h-[80vh]">
      <div className="w-full max-w-3xl p-6 bg-zinc-900/70 rounded-2xl shadow-2xl border border-cyan-500/20 backdrop-blur-sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </main>
  </div>
</Router>

) }

export default App

