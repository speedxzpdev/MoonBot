const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, Collection } = require("discord.js");
require("dotenv").config({ debug: false});


async function moon() {

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

  //sistema de handler de comandos!
  const commands = new Collection();
  comandos_dir = fs.readdirSync(path.join(__dirname, "commands")).filter(arq_list => arq_list.endsWith(".js"));
  
  const slashCommandList = []
  
  for (const file of comandos_dir) {
    const comando_file = require(path.join(__dirname, "commands", file));
    commands.set(comando_file.data.name, comando_file);
    slashCommandList.push(comando_file.data.toJSON());
  }
  
  const rest = new REST({version: "10"}).setToken(process.env.TOKEN_BOT);
  
  await rest.put(Routes.applicationGuildCommands("1432672069363171350", "1406134812317585498"), {body: []});



//on ready 
require("./events/on_ready")(client)

//evento de mensagem
require("./events/messages_handler")(client, commands)

require("./events/interaction")(client, commands)


client.login(process.env.TOKEN_BOT)

}
moon()