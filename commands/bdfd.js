const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bdfd')
    .setDescription('BDFD hakkında bilgi verir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('BDFD Hakkında')
      .setDescription('BDFD (Bot Designer For Discord), botlar oluşturmak için bir mobil uygulamadır.');

    await interaction.reply({ embeds: [embed] });
  },
};
