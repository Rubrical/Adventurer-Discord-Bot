const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ir")
        .setDescription("Jogue dados de probabilidades invisíveis")
        .addStringOption(option =>
            option
                .setName("roll_invisible")
                .setDescription("Ex: 1d6")
        ),

    async execute(interaction){
        try {
            const dice = interaction.options.getString("roll");
            const match = dice.match(/(\d+)d(\d+)\s?([+\-]?\s?\d+)?\s?([+\-]?\s?\d+)?/);

            const qty_of_dices = parseInt(match[1]);
            const dice_faces = parseInt(match[2]);
            const extra_num = parseInt(match[3]?.replace(/\s/g, '') || '0');
            const other_num = parseInt(match[4]?.replace(/\s/g, '') || '0');

            const results = [];
            let total_sum = 0;

            for (let i = 0; i < qty_of_dices; i++) {
                const result = Math.floor(Math.random() * dice_faces) + 1;
                results.push(result.toString());
                total_sum += result;
            }

            total_sum += extra_num;
            total_sum += other_num;

            if (isNaN(total_sum)) {
                throw new Error("Formato inválido. Utilize o formato: (quantidade_dados)d(faces) +/- número_extra +/- número extra sem os parênteses (os números extras são opcionais).");
            }

             await interaction.reply({content: `\` ${total_sum} \` ⇐ [${results.join(', ')}] ${dice}`, ephemeral: true});
        } catch (error) {
            await interaction.reply("Erro desconhecido, comunique ao desenvolvedor")
             console.error(error.message);
        }

    }
}