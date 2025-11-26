module.exports = (client) => {
  
  client.once("clientReady", () => {
  console.log(`Online como: ${client.user.username}`)
  console.log(`Latência do discord: ${client.ws.ping}ms`)
  
  client.user.setPresence({
    activities: [{
      name: "Bleach tybw",
      type: 3
    }],
    status: "online"
  });
});
  
}