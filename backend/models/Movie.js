import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  videoUrl: { type: String, required: true },
  thumbnail: String,
  uploadedAt: { type: Date, default: Date.now }
})

export default mongoose.model("Movie", movieSchema)
