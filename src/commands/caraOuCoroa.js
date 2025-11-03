const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("cara-ou-coroa").setDescription("Aposte com seu amigo, cara ou coroa!").addUserOption(option => option)
}