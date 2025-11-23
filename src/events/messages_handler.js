module.exports = (client, commands) => {
  const { prefixo } = require("../config.js");
  const { users } = require("../database/models/users");
  const connectMongo = require("../database/index");
const { guildDb } = require("../database/models/guild");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const emojis = require("../emojis.json")


  connectMongo();
  
  client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.everyone) return;
  
  if (!await users.findOne({userId: message.author.id})) {
    await users.create({userId: message.author.id
    })
  }
  
  if (!await guildDb.findOne({guildId: message.guildId})) {
    await guildDb.create({guildId: message.guildId})
  }
  
  if (message.mentions.has(client.user.id)) {
    if (message.reference) return;
    
    const embedHelp = new EmbedBuilder().setTitle(`Olá ${message.author.globalName}${emojis.feliz}!`).setDescription(`${emojis.choro}Está com dúvidas? Ou quer configurar o bot? Use !configs para ver meus comandos de configurações.\n\nQuer ver todos meus comandos${emojis.lanbendo}? Use !comandos`).setThumbnail("https://files.catbox.moe/naco8z.png").setImage("https://files.catbox.moe/2m3gws.png").setFooter({text: "Desenvolvido por: speed"}).setColor("#0092E7")
    
    const botaoConvidarBot = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel(`Convidar bot`).setEmoji({id: "1433463773363961956"}).setStyle(ButtonStyle.Link).setURL("https://discord.com/oauth2/authorize?client_id=1432672069363171350&permissions=8&integration_type=0&scope=bot"));
    
    const speedGitHub = new ActionRowBuilder().addComponents( new ButtonBuilder.().setLabel("GitHub").setStyle(ButtonStyle.Link).setURL("https://github.com/speedxzpdev/MoonBot"));
    
    await message.reply({embeds: [embedHelp], components: [botaoConvidarBot]})
    
  }
  
  
  
  if (message.content.startsWith(prefixo)) {
  
  
  
  
  const msgSemPrefix = message.content.slice(prefixo.length).trim();
  const args = msgSemPrefix.toLowerCase().split(/ +/);
  const cmdSeparado = args.shift();
  const command = commands.get(cmdSeparado)
  
  if (!command) {
    await message.reply(`Poxa ${message.author.globalName}!, não achei esse comando nos meus registros...`)
    return
  }
  
  
  try {
  command.execute(message, args)}
  catch(err) {
    message.reply("Ocorreu um problema ao chamar comando.");
  }
  
}
  
    
});
  
  
  
}