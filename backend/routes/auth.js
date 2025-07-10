import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ msg: "Email already in use" })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })
    res.status(201).json({ msg: "User registered" })
  } catch (err) {
    res.status(500).json({ msg: "Error", err })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: "User not found" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ msg: "Wrong password" })

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
    res.json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } })
  } catch (err) {
    res.status(500).json({ msg: "Login failed", err })
  }
})

export default router
