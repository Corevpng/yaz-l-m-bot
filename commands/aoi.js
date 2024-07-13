const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aoi')
    .setDescription('aoi.js hakkında bilgi verir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('aoi.js Hakkında')
      .setDescription('aoi.js, bot oluşturmak için basit ve güçlü bir kütüphanedir.');

    await interaction.reply({ embeds: [embed] });
  },
};
