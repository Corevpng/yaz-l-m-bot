const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const shopItems = require('../data/shop.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Displays the items available in the shop.'),
  async execute(interaction) {
    const items = shopItems.map(item => `${item.name}: ${item.price} coins`).join('\n');
    await interaction.reply(`Shop Items:\n${items}`);
  },
};
