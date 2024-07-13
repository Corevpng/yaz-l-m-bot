const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');
const shopItems = require('../data/shop.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item from the shop.')
    .addStringOption(option => option.setName('item').setDescription('The item you want to buy').setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item').toLowerCase();
    const item = shopItems.find(i => i.name.toLowerCase() === itemName);

    if (!item) {
      return interaction.reply('Item not found in the shop.');
    }

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
    }

    if (economyData.users[userId].balance < item.price) {
      return interaction.reply('You do not have enough coins to buy this item.');
    }

    economyData.users[userId].balance -= item.price;
    economyData.users[userId].inventory.push(item.name);
    fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));

    await interaction.reply(`You bought a ${item.name} for ${item.price} coins.`);
  },
};
