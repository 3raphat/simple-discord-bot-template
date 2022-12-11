const { ActivityType } = require("discord.js");

module.exports = (client) => {
    console.log(`${client.user.tag} is Ready!`);
    client.user.setActivity("Made with ♥", { type: ActivityType.Playing });
};