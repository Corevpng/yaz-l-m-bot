const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;  // Botunuzun Client ID'sini .env dosyasından al
const guildId = process.env.GUILD_ID;    // Botunuzu çalıştırmak istediğiniz sunucunun ID'sini .env dosyasından al

const commands = [];
const commandsPath = './commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = `${commandsPath}/${file}`;
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: [],
    });

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
