const mongoose = require('mongoose');


const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, },
  configs: {
    idioma: { type: String, default: "pt-br"},
    bemvindo: {
      event: { type: Boolean, default: false},
      wallpaper: { type: String, default: "https://files.catbox.moe/5n4v7k.jpg"},
      canal: { type: String, default: null}
    }
  },
  xp: { type: Number, default: 0},
  level: { type: Number, default: 1}
});

const guildDb = mongoose.model("Guild", guildSchema);

module.exports = {
  guildDb
}

