import { Activity, Events, GuildMember, Presence } from "discord.js";
import BotEvent from "../classes/event";

class PresenceUpdate extends BotEvent {
    constructor() {
        super();
        this.name = Events.PresenceUpdate;
    }

    async execute(oldPresence: Presence | null, newPresence: Presence): Promise<void> {
        
        const member: GuildMember | null = newPresence.member;
        const activities: Activity[] = newPresence.activities;

        const bannedGame = "league of legends"

        if (!member) {
            return;
        }

        activities.forEach((activity) => {
            if (activity.name.toLowerCase() == bannedGame) {
                member.send(`You have been banned for playing ${bannedGame}`)
                    .then(() => {
                        member.ban({
                            reason: `Banned for playing ${bannedGame}`,
                        });
                    });
            }
        });

    }
}

export default new PresenceUpdate;