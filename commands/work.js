const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const economyPath = path.join(__dirname, '../data/economy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to earn some coins.'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const reward = Math.floor(Math.random() * 200) + 100;

    let economyData = JSON.parse(fs.readFileSync(economyPath, 'utf8'));

    if (!economyData.users[userId]) {
      economyData.users[userId] = {
        balance: 0,
        daily: 0,
        inventory: []
      };
      fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));
    }

    economyData.users[userId].balance += reward;

    fs.writeFileSync(economyPath, JSON.stringify(economyData, null, 2));

    await interaction.reply(`You worked hard and earned ${reward} coins.`);
  },
};
