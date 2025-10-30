const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  dinheiro: { type: Number, default: 20 },
  createDate: { type: Date, default: Date.now},
  xp: { type: Number, default: 0},
  level: { type: Number, default: 1},
  diario: { type: Date, default: null},
  bomdia: { type: Date, default: null},
  lovemoon: { type: Number, default: 0 },
  descricao: { type: String, default: null }
})

const users = mongoose.model("User", userSchema)

module.exports = {
  users
}