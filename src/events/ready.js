module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		try {
			console.log(`Initializing bot\n     Bot Tag: ${ client.user.tag }`);
			console.log('Successfully initialized bot.') // Log that the bot was successfully initialized
		}
		catch (error) {
			console.error(error);
		}
	},
};