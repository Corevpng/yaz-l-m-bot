// commands/bet.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bet')
    .setDescription('Place a bet and try your luck!')
    .addIntegerOption(option => option.setName('amount').setDescription('The amount to bet').setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const betAmount = interaction.options.getInteger('amount');

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
      fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));
    }

    const userBalance = economyData.users[userId].balance;

    if (betAmount > userBalance) {
      return interaction.reply('You do not have enough coins to place this bet.');
    }

    const outcome = Math.random() < 0.5 ? 'win' : 'lose';

    if (outcome === 'win') {
      const winnings = betAmount * 2;
      economyData.users[userId].balance += winnings;

      await interaction.reply(`Congratulations! You won ${winnings} coins.`);
    } else {
      economyData.users[userId].balance -= betAmount;

      await interaction.reply(`You lost ${betAmount} coins. Better luck next time!`);
    }

    fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));
  },
};
