const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
    shards: "auto",
    allowedMentions: {
      parse: ["roles", "users"],
      repliedUser: false
    },
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ],
});

client.config = require('./settings/config.js');
client.embed_color = client.config.embed_color;
client.owner = client.config.owner
if (!client.token) client.token = client.config.token;

process.on('unhandledRejection', err => console.log(err));
process.on('uncaughtException', err => console.log(err));

["commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(client.token);
