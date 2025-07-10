import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import movieRoutes from "./routes/movies.js"
import userRoutes from "./routes/users.js"
import fileUpload from "express-fileupload"
import path from "path"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
app.use("/api/users", userRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected")
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running")
    )
  })
  .catch(err => console.log("❌ DB Error:", err))
