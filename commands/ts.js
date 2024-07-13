const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ts')
    .setDescription('TypeScript hakkında bilgi verir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('TypeScript Hakkında')
      .setDescription('TypeScript, JavaScript\'i ölçeklenebilir bir şekilde yazmanıza olanak tanır.');

    await interaction.reply({ embeds: [embed] });
  },
};
