const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Displays your inventory.'),
  async execute(interaction) {
    const userId = interaction.user.id;

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
      fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));
    }

    const inventory = economyData.users[userId].inventory;
    const inventoryList = inventory.length > 0 ? inventory.join(', ') : 'Your inventory is empty.';

    await interaction.reply(`Your inventory: ${inventoryList}`);
  },
};
