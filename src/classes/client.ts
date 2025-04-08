import { Client, GatewayIntentBits } from 'discord.js';
import BotHandler, { Handlers } from './handler';
import { join, resolve } from 'path';
import { runAtMultipleSpecificTimes } from '../modules/timedEvents';

export class BotClient extends Client {
    constructor() {

        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
            shards: 'auto',
        });
    }

    async start() {
        this.loadHandlers(
            this,
            []
        );

        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    stop() {
        this.destroy();
    }


    private async loadHandlers(client: BotClient, handlers: string[]) {

        handlers.forEach((handler) => {
            console.log(`Loading handler ${handler}`);
            const handlerPath: string = join(__dirname, `../handlers/${handler}`);
            this.importHandler(handlerPath).then((importedHandler: BotHandler) => {
                if (importedHandler.intervalEnabled) {
                    runAtMultipleSpecificTimes(() => {
                        importedHandler.execute(client);
                    }, importedHandler.interval);
                }
                else {
                    importedHandler.execute(client);
                }
            });
        });
    }

    private async importHandler(filePath: string) {
        console.log(`Importing handler from ${filePath}`);
        const handlerModule = await import(filePath);
        return handlerModule.default;
    }
}

export default BotClient;