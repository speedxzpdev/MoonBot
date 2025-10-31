const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { users } = require("../database/models/users");



module.exports = {
  data: new SlashCommandBuilder().setName("saldo").setDescription("Mostra seu saldo!").addUserOption(option => option.setName("user").setDescription("Caso queira ver o saldo de alguém.").setRequired(false)),
  
  async execute(interaction) {
    try {
    await interaction.deferReply()
    
    
    const IsMetioned = interaction.options.getUser("user");
    
    
    
    if (IsMetioned) {
      
      const perfilMention = await users.findOne({userId: IsMetioned.id})
      
      const embedMention = new EmbedBuilder().setDescription(`Olá ${interaction.user.globalName}, o saldo do(a) ${IsMetioned} é de ${perfil.dinheiro} moedas!`).setColor("Green");
      
      await interaction.editReply({embeds: [embedMention]});
      
      return
    }
    
    if (!await users.findOne({userId: interaction.user.id})) {
      await registrarUser(interaction.user.id)
    }
    
    const perfil = await users.findOne({userId: interaction.user.id})
    
    
    
    const embed = new EmbedBuilder().setDescription(`Olá ${interaction.user.globalName}, seu saldo é de ${perfil.dinheiro} moedas!`).setColor("Green")
    
    await interaction.editReply({embeds: [embed]});
    }
    catch(err) {
      console.error(err);
    }
    
  }
  
}