import BotClient from './classes/client';
import { config } from 'dotenv';

config();

console.log('Starting bot...');

const client = new BotClient();
client.start();