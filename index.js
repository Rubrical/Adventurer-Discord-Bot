const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const {TOKEN} = process.env;

const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands");
const commandsFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection()

for (const file of commandsFile) {
    const filePath = path.join(commandsPath, file);

    const commands = require(filePath);

    if ("data" in commands && "execute" in commands) {
        client.commands.set(commands.data.name, commands);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }

}

// Bot login
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN)

// Listeners
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error("Couldn't find command");
        return
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply("Ocorreu um erro durante a execução do comando...");
    }
});