const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');
const shopItems = require('../data/shop.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sell')
    .setDescription('Sell an item from your inventory.')
    .addStringOption(option => option.setName('item').setDescription('The item you want to sell').setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item').toLowerCase();
    const item = shopItems.find(i => i.name.toLowerCase() === itemName);

    if (!item) {
      return interaction.reply('Item not found in your inventory.');
    }

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
    }

    const itemIndex = economyData.users[userId].inventory.indexOf(item.name);
    if (itemIndex === -1) {
      return interaction.reply('You do not have this item in your inventory.');
    }

    economyData.users[userId].inventory.splice(itemIndex, 1);
    economyData.users[userId].balance += item.price;
    fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));

    await interaction.reply(`You sold a ${item.name} for ${item.price} coins.`);
  },
};
