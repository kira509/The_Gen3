import express from "express"
import Movie from "../models/Movie.js"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"

const router = express.Router()

// Auth middleware
const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ msg: "No token" })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(403).json({ msg: "Invalid token" })
  }
}

// Upload movie (admin only)
router.post("/upload", verify, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Not admin" })

  const file = req.files?.video
  if (!file) return res.status(400).json({ msg: "No video uploaded" })

  const filePath = `uploads/${Date.now()}-${file.name}`
  await file.mv(filePath)

  const movie = await Movie.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    videoUrl: filePath
  })

  res.status(201).json({ msg: "Movie uploaded", movie })
})

// Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ uploadedAt: -1 })
  res.json(movies)
})

// Stream video
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
