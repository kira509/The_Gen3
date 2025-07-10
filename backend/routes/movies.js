import express from "express"
import Movie from "../models/Movie.js"
import jwt from "jsonwebtoken"
import fs from "fs"

const router = express.Router()

// 🔐 Middleware to verify token
const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ msg: "No token provided" })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(403).json({ msg: "Invalid token" })
  }
}

// ✅ Upload movie (text-only version, no video yet)
router.post("/", verify, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Not admin" })

  const { title, description, category, thumbnail } = req.body

  if (!title || !category) {
    return res.status(400).json({ msg: "Missing title or category" })
  }

  try {
    const movie = await Movie.create({
      title,
      description,
      category,
      thumbnail,
      uploadedAt: new Date()
    })

    res.status(201).json({ msg: "Movie uploaded", movie })
  } catch (err) {
    console.error("Upload error:", err)
    res.status(500).json({ msg: "Failed to upload movie" })
  }
})

// 🎬 Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ uploadedAt: -1 })
    res.json(movies)
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch movies" })
  }
})

// 📽️ Stream video (if video streaming is added later)
router.get("/watch/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) return res.status(404).json({ msg: "Movie not found" })

  const range = req.headers.range
  if (!range) return res.status(400).send("Requires Range header")

  const videoPath = movie.videoUrl
  const videoSize = fs.statSync(videoPath).size

  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + 1_000_000, videoSize - 1)

  const contentLength = end - start + 1
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4"
  }

  res.writeHead(206, headers)
  fs.createReadStream(videoPath, { start, end }).pipe(res)
})

export default router

