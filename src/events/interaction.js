module.exports = async (client, commands) => {
  
  client.on("interactionCreate",  async (interaction) => {
  
  const command = commands.get(interaction.commandName)
  
  if(command) {
    
    await command.execute(interaction)
  }
  
  })
  
  
}