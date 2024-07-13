const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yardım')
    .setDescription('Mevcut komutların listesini gösterir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Yardım Menüsü')
      .setDescription('Aşağıda mevcut komutların listesi bulunmaktadır:')
      .addFields(
        { name: '/hakkında', value: 'Bot hakkında bilgi verir.', inline: true },
        { name: '/istatistik', value: 'Botun istatistiklerini gösterir.', inline: true },
        { name: '/kod-paylaş', value: 'Kod paylaşımı yapar.', inline: true },
        { name: '/djs', value: 'discord.js hakkında bilgi verir.', inline: true },
        { name: '/aoi', value: 'aoi.js hakkında bilgi verir.', inline: true },
        { name: '/ts', value: 'TypeScript hakkında bilgi verir.', inline: true },
        { name: '/bdfd', value: 'BDFD hakkında bilgi verir.', inline: true },
        { name: '/yardım', value: 'Mevcut komutların listesini gösterir.', inline: true },
        // Diğer komutlarınızı buraya ekleyin.
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};