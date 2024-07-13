const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kod-paylaş')
    .setDescription('Kod paylaşımı yapar.')
    .addStringOption(option => option.setName('dil').setDescription('Kodun yazıldığı dil').setRequired(true))
    .addChannelOption(option => option.setName('kanal').setDescription('Kodun gönderileceği kanal').setRequired(true))
    .addStringOption(option => option.setName('kod').setDescription('Gönderilecek kod').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const dil = interaction.options.getString('dil');
    const kanal = interaction.options.getChannel('kanal');
    const kod = interaction.options.getString('kod');

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${dil} Kod Paylaşımı`)
      .setDescription(`**Kod Gönderen:** ${interaction.user}\n\n**Kod:**\n\`\`\`${dil}\n${kod}\n\`\`\``);

    kanal.send({ embeds: [embed] });
    await interaction.reply({ content: 'Kod başarıyla paylaşıldı!', ephemeral: true });
  },
};
