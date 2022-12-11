const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { token } = require('../settings/config')

module.exports = (client) => {
  const data = [];

  readdirSync("./commands/").forEach(dir => {

		const commandFiles = readdirSync(`./commands/${dir}/`).filter(files => files.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`../commands/${dir}/${file}`);

			if (!command.name) return console.log(`${file} -> missing name property!`);
			if (!command.description) return console.log(`${file} -> missing description property!`);

			client.commands.set(command.name, command);
			data.push(command);
		}
	});

  client.on('ready', async () => {
		const rest = new REST({ version: '10' }).setToken(token);
	
		(async () => {
			try {
				console.log(`Started refreshing ${data.length} application (/) commands.`);
	
				/* Registering the commands for a single guild. */
				// await rest.put(Routes.applicationGuildCommands(client.user.id, 'YOUR_GUILD_ID'), { body: data });
				// console.log(`Successfully reloaded ${data.length} application (/) commands.`);
				
				/* Registering the commands for all the guilds the bot is in. */
				await rest.put(Routes.applicationCommands(client.user.id), { body: data });
				console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	
				/* Deleting all the commands. */
				// await rest.put(Routes.applicationCommands(client.user.id), { body: [] });
				// console.log(`Successfully deleted all application (/) commands.`);
				
			} catch (err) {
				console.log(err, 'error');
			}
		})();
  });
}