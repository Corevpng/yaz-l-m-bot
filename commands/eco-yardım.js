const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eco-yardım')
    .setDescription('Lists all available commands.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Help - Available Commands')
      .setDescription(`
        **/balance** - Displays your current balance.
        **/daily** - Claim your daily reward.
        **/inventory** - Displays your inventory.
        **/bet** - Place a bet and try your luck!
        **/work** - Work to earn some coins.
        **/shop** - Displays the items available in the shop.
        **/buy** - Buy an item from the shop.
        **/sell** - Sell an item from your inventory.
      `)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
