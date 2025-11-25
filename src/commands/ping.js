const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const os = require("os");



module.exports = {
data: new SlashCommandBuilder().setName("ping").setDescription("mostra o ping do bot."),
async execute(interact) {
  
  const comeco = Date.now();
  await interact.reply("Pong!");
  const depois = Date.now();
  
  const latencia = depois - comeco
  
  let qualidadePing = ""
  let corPing = ""
  
  if (qualidadePing > 50) {
    qualidadePing = "Excelente!"
    corPing = "Green"
  }
  else if (qualidadePing > 200) {
    qualidadePing = "Médio"
    corPing = "Yellow"
  }
  
  else {
    qualidadePing = "Instável"
    corPing = "Red"
  }
  
  
  let fraseHora = ""
  const hora = new Date().getHours();
  
   if (hora < 12) {
    fraseHora = "Bom dia"
  }
  else if (hora < 18) {
    fraseHora = "Boa tarde"
  }
  else {
    fraseHora = "Boa noite"
  }
  
  
  const embed = new EmbedBuilder().setTitle(`${fraseHora} ${interact.user.globalName}!`).setDescription(`*Latência:* ${latencia}\n*Qualidade:* ${qualidadePing}\nHost: ${os.hostname()}\nNode: ${process.version}`).setThumbnail("https://files.catbox.moe/8v6lib.jpg").setColor(corPing).setFooter({text: `Horário: ${new Date().toLocaleTimeString("pt-BR")}`})
  
  
  await interact.editReply({embeds: [embed]});
}
}