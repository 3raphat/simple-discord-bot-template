const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check the bot's response time",

  run: async (client, interaction) => {
    const api_ping = client.ws.ping;
    
    const embed = new EmbedBuilder()
      .setColor(client.embed_color)
      .setDescription(`Pong! ${api_ping}ms`)

    return interaction.reply({ embeds: [embed] });
  },
};
