import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  isAdmin: { type: Boolean, default: false }
})

export default mongoose.model("User", userSchema)
