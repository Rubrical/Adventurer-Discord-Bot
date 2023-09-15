const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("s")
        .setDescription("Sorteia uma palavra aleatória em um lista de palavras")
        .addStringOption(option =>
            option
                .setName("sorteio")
                .setDescription("digite as palavras que você deseja sortear separando-as por espaços")
        ),

    async execute(interaction){
        const choice = interaction.options.getString("sorteio");
        const raffle = choice.split(" ");
        const newChoice = raffle[Math.floor(Math.random() * raffle.length)];
        await interaction.reply(newChoice);
    }
};