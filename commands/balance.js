const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Displays your current balance.'),
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

    const balance = economyData.users[userId].balance;

    await interaction.reply(`Your current balance is: ${balance} coins.`);
  },
};
