const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('djs')
    .setDescription('discord.js hakkında bilgi verir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('discord.js Hakkında')
      .setDescription('discord.js, Discord API için güçlü bir JavaScript kütüphanesidir.');

    await interaction.reply({ embeds: [embed] });
  },
};
