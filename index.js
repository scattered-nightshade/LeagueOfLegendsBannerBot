const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

require('dotenv').config();

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    const game = newPresence.presence.game;
    game.name = game.name.toString().toLowerCase();

    if (game.name === 'league of legends'){
        await newPresence.member.send('You have kinda been lacking, you\'ve been banned for playing League Of Legends');
        await newPresence.member.ban({ reason: 'They tried to play league of legends'})
    }
});

client.login(process.env.DISCORD_TOKEN);