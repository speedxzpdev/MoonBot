const { SlashCommandBuilder } = require("discord.js");
const { users } = require("../database/models/users");


module.exports = {
  data: new SlashCommandBuilder().setName("transferir").setDescription("Transfira moédas para um usuário.").addUserOption(option => option.setName("usuario").setDescription("Usuário para transferir dinheiro.").setRequired(true)).addNumberOption(option => option.setName("valor").setDescription("Valor a transferir.").setRequired(true)),
  async execute(interact) {
    try {
      await interact.deferReply();
      
      const autor = interact.user.id 
      const alvo = interact.options.getUser("usuario");
      
      const valor = interact.options.getNumber("valor");
      
      const autorDb = await users.findOne({userId: autor});
      const saldo = autorDb?.dinheiro || 0
      
      if (!autorDb) {
        await users.create({userId: autor})
      }
      
      
      if (!await users.findOne({userId: alvo.id})) {
        await users.create({userId: alvo.id});
      }
      
      if (valor <= 0) {
        await interact.editReply("Não pode enviar valores abaixo de 1!")
        return
      }
      
      if (valor > saldo) {
        await interact.editReply("Valor insuficiente para transferência. Use /saldo para ver detalhes!")
        return
      }
      await users.updateOne({userId: alvo.id}, {$inc: {dinheiro: valor}});
      await users.updateOne({userId: autor}, {$inc: {dinheiro: - valor}})
      
      await interact.editReply(`**transferência concluida!**\n <@${autor}> enviou **${valor}** moedas💸 para <@${alvo.id}>!`)
    }
    catch(err) {
      console.error(err)
    }
    
    
  }
}