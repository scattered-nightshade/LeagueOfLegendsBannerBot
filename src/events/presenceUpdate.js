module.exports = {
	name: 'presenceUpdate',
	execute(oldPresence, newPresence) {
		try {
            const member = newPresence.member;
            const activities = newPresence.activities;
            const bannedGame = 'league of legends';
            if (member.user.bot) return;
            if (activities.length === 0) return;
            
            if (activities[0].name === bannedGame) {
                member.user.send(`You are not allowed to play ${bannedGame}`).then(() => {
                    member.ban();
                });
            }
		}
		catch (error) {
			console.error(error);
		}
	},
};