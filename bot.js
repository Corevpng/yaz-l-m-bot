const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(token);

// Botun sese katılması için kod
client.on('ready', () => {
  const voiceChannel = client.channels.cache.get('<SES_KANAL_İD>');
  if (voiceChannel && voiceChannel.type === 'GUILD_VOICE') {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    console.log('Bot ses kanalına katıldı.');
  } else {
    console.error('Ses kanalı bulunamadı veya geçerli bir ses kanalı değil.');
  }

  const logChannel = client.channels.cache.get('<LOG_KANAL_İD>');
  if (logChannel) {
    logChannel.send('Bot aktif durumda!');
  }
});
