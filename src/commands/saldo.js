const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { users } = require("../database/models/users");



module.exports = {
  data: new SlashCommandBuilder().setName("saldo").setDescription("Mostra seu saldo!"),
  async execute(interaction) {
    await interaction.deferReply()
    
    if (!await users.findOne({userId: interaction.user.id})) {
      await registrarUser(interaction.user.id)
    }
    
    const perfil = await users.findOne({userId: interaction.user.id})
    
    
    
    const embed = new EmbedBuilder().setDescription(`Olá ${interaction.user.globalName}, seu saldo é de ${perfil.dinheiro} moedas!`).setColor("Green")
    
    await interaction.editReply({embeds: [embed]});
    
    
  }
  
}