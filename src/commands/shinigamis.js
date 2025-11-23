const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const shinigamisList = require("../database/random/shinigamis.json");

module.exports = {
  data: new SlashCommandBuilder().setName("shinigami").setDescription("Te dá um personagem aleatório de Bleach"),
  
  async execute(interaction) {
    try {
      
      await interaction.deferReply();
      
      const shinigamisRandom = shinigamisList[Math.floor(Math.random() * shinigamisList.length)];
      
      const embed = new EmbedBuilder().setDescription(`${interaction.user.username}, seu shinigami é... ${shinigamisRandom.name}`).setImage(shinigamisRandom.img).setColor("Random");
      
      await interaction.editReply({embeds: [embed]});
      
    }
    catch(err) {
      await interaction.editReply("Ocorreu um erro");
      console.log(err)
    }
    
    
    
  }
  
  
}