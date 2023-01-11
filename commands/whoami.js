const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("whoami").setDescription("Who am I?"),
	async execute(interaction) {
		await interaction.reply(`
		A bundle of javascript lines :-]\nCheck out the github for the latest updates: https://github.com/mustafabin/discord-bot-lelouch
		`);
	},
};
