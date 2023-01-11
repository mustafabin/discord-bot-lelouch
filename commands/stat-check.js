const { SlashCommandBuilder } = require("discord.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


module.exports = {
	data: new SlashCommandBuilder()
		.setName("check")
		.setDescription("checks a valorant players rank")
		.addStringOption((option) => 
            option
                .setName("username")
                .setDescription("The name and tag line of the valorant acc")
                .setRequired(true)
        ),
	async execute(interaction) {
        let response = await fetch(`https://tracker.gg/valorant/profile/riot/${encodeURIComponent(interaction.options.getString('username').trim())}/overview`)
        let data = await response.text()
        const dom = new JSDOM(data);
        let ranks = dom.window.document.querySelectorAll(".rating-entry__rank-info")
        let discordResponse = ""
        if(ranks.length === 0){
            discordResponse = "Either this user doesnt exist on the tracker gg website or is privated \n If this is a real player my bad g your boy is to broke to pay for a offical valorant api key"
        }else{
            let currentRank = ranks[0].textContent.split("Rating")[1]
            let peakRank = ranks[1].textContent.split("EPISODE")[0]
            discordResponse = `Your current rating is ${currentRank} and your peak is ${peakRank}`
        }
		await interaction.reply(discordResponse);
	},
};
