import { useEffect, useState } from "react"
import API from "../services/api"

export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    API.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to load movies:", err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-red-500 drop-shadow-md mb-10">
        🎬 Welcome to MovieFlix
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/20 transition">
              <img
                src={movie.thumbnail || "https://via.placeholder.com/300x160"}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-zinc-400">{movie.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-400">No movies found. Upload some!</p>
        )}
      </div>
    </div>
  )
}
