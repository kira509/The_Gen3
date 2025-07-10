import express from "express"
import User from "../models/User.js"
import Movie from "../models/Movie.js"
import jwt from "jsonwebtoken"

const router = express.Router()

// Middleware to verify token
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

// Add to favorites
router.post("/favorites/:movieId", verify, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: req.params.movieId } })
  res.json({ msg: "Added to favorites" })
})

// Add to watchlist
router.post("/watchlist/:movieId", verify, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { watchlist: req.params.movieId } })
  res.json({ msg: "Added to watchlist" })
})

// Get user data
router.get("/me", verify, async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites watchlist")
  res.json(user)
})

export default router
