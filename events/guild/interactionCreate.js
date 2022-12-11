const { EmbedBuilder, Colors } = require("discord.js");

module.exports = async (client, interaction) => {
	if (interaction.isCommand || interaction.isContextMenuCommand || interaction.isChatInputCommand) {

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		/* It's checking if the user has the permissions to run the command. */
		if (!interaction.member.permissions.has(command.userPermissions || [])) {
			const embed = new EmbedBuilder()
				.setColor(Colors.Yellow)
				.setDescription(`You need ${command.userPermissions.join(", ")} permission to use this command.`)

			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
		/* It's checking if the bot has the permissions to run the command. */
		if (!interaction.guild.members.me.permissions.has(command.botPermissions || [])) {
			const embed = new EmbedBuilder()
				.setColor(Colors.Yellow)
				.setDescription(`I need ${command.botPermissions.join(", ")} permissions to use this command.`)
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
		/* It's checking if the command is only available to the owner. */
		if (command.owner && interaction.user.id !== client.owner) {
			const embed = new EmbedBuilder()
				.setColor(Colors.Yellow)
				.setDescription(`This command is only available to the owner.`)
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
		try {
			command.run(client, interaction);
		} catch (err) {
			return interaction.reply({ content: "An unexpected error occurred.", ephemeral: true });
		}
	}
}
