const axios = require("axios");
const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
require("dotenv").config()


module.exports = {
  data: new SlashCommandBuilder().setName("tiktok").setDescription("Baixa videos do tiktok.").addStringOption(a => a.setName("url").setDescription("Link do seu video.").setRequired(true)),
  
  async execute(interact) {
    
    try {
    
    await interact.deferReply();
    
    const url = interact.options.getString("url");
    
    const req = await axios.get(`https://zero-two-apis.com.br/api/download/tiktok?url=${url}&apikey=${process.env.API_KEYDL}`);
    
    const data = req.data.resultado
    
    
    const videoList = data.video.playAddr
    
    let arqsSend = []
    
    for (let arquivos of videoList) {
      
      let video = new AttachmentBuilder(arquivos);
      
      arqsSend.push(video)
      
    }
    
    await interact.editReply({content: "sla", files: arqsSend});
    
    
    
  }
  catch(err) {
    console.error(err);
  }
  
  }
  
}