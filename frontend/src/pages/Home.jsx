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
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-red-500">🔥 Featured Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="bg-zinc-900 rounded-lg shadow p-2">
              <img
                src={movie.thumbnail || "https://via.placeholder.com/300x160"}
                alt={movie.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{movie.title}</h3>
              <p className="text-sm text-zinc-400">{movie.category}</p>
            </div>
          ))
        ) : (
          <p>No movies found. Upload some!</p>
        )}
      </div>
    </div>
  )
}
