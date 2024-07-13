const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward.'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const currentTime = Date.now();

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
    }

    const lastClaimed = economyData.users[userId].daily;
    const oneDay = 24 * 60 * 60 * 1000;

    if (currentTime - lastClaimed >= oneDay) {
      const reward = Math.floor(Math.random() * 300) + 200;
      economyData.users[userId].balance += reward;
      economyData.users[userId].daily = currentTime;

      fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));

      await interaction.reply(`You have claimed your daily reward of ${reward} coins.`);
    } else {
      const timeLeft = oneDay - (currentTime - lastClaimed);
      const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
      const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
      
      await interaction.reply(`You have already claimed your daily reward. Please wait ${hoursLeft} hours and ${minutesLeft} minutes.`);
    }
  },
};
