import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom" import Login from "./pages/Login" import Register from "./pages/Register" import Home from "./pages/Home"

function App() { return ( <Router> <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white font-sans"> {/* Navigation Bar */} <nav className="flex justify-center gap-10 py-6 shadow-xl border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50"> <Link to="/" className="text-xl font-bold text-cyan-400 hover:text-white transition duration-300">Home</Link> <Link to="/login" className="text-xl font-bold text-cyan-400 hover:text-white transition duration-300">Login</Link> <Link to="/register" className="text-xl font-bold text-cyan-400 hover:text-white transition duration-300">Register</Link> </nav>

{/* Page Content */}
    <main className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-2xl p-6 bg-zinc-800 rounded-3xl shadow-2xl border border-cyan-500/20">
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

