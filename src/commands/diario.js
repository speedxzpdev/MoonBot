const { SlashCommandBuilder } = require("discord.js");
const { users } = require("../database/models/users")


module.exports = {
  data: new SlashCommandBuilder().setName("diario").setDescription(".");
  async execute(interact) {
    try {
    await interact.deferReply();
    
    const usuarioData = await users.findOne({userId: interact.user.id});
    
    const ultimoDaily = new Date(usuarioData.diario);
    
    const agora = new Date();
    
    if (ultimoDaily.toLocaleDateString("pt-BR") === agora.toLocaleDateString("pt-BR")) {
      
      await interact.editReply({content: "Esperto você né? Já resgatou seu diário de hoje, volte amanhã.", ephemeral: true});
      return
    }
    
    const dinheiroRandom = Math.floor(Math.random() * 2000) +1
    
    await users.updateOne({userId: interact.user.id}, {$inc: {dinheiro: dinheiroRandom}});
    
    await interact.editReply(`Parabéns! ${interact.user.globalName}, você ganhou ${dinheiroRandom} moedas!`);
    
    }
    catch(err) {
      console.error(err);
      await interact.editReply("Ocorreu um erro inésperado!")
    }
    
    
  }

  
  
  
}