const { Client, GatewayIntentBits } = require('discord.js');
const { resolve } = require('path'); // Import the resolve module from path

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

require('dotenv').config();

['event'].forEach((handler) => {
	require(resolve(`./src/handlers/${handler}`))(client); // For each of the two handlers, require the handler file and run it
});

client.login(process.env.DISCORD_TOKEN);