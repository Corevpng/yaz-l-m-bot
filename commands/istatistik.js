const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('istatistik')
    .setDescription('Botun istatistiklerini gösterir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Bot İstatistikleri')
      .setDescription(`Sunucu Sayısı: ${interaction.client.guilds.cache.size}\nKullanıcı Sayısı: ${interaction.client.users.cache.size}`);

    await interaction.reply({ embeds: [embed] });
  },
};
