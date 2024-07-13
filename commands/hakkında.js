const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hakkında')
    .setDescription('Bot hakkında bilgi verir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Bot Hakkında')
      .setDescription('Bu bot, sunucu için çeşitli özellikler sunar.');

    await interaction.reply({ embeds: [embed] });
  },
};
