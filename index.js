const Discord = require("discord.js"); // discord.js 라이브러리 호출
const {
  Client,
  Intents,
  MessageActionRow,
  Modal,
  TextInputComponent,
} = require("discord.js"); // Client 객체 생성
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// 봇과 서버를 연결해주는 부분
client.login(
  "OTg4MzAzNjgwODI0NTQ5NDA2.GOW8Bu.cPm-gVHCLduG3YUN-cpcO378atNuOF5x6IDG2U"
);

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once("ready", () => {
  console.log("Ready!");
  // client.api
  //   .applications("988303680824549406")
  //   .guilds("974461844423061504")
  //   .commands.post({
  //     data: {
  //       name: "ping",
  //       description: "modal test",
  //     },
  //   });
});

const commands = [
  new SlashCommandBuilder()
    .setName("testmethod")
    .setDescription("테스트를 합니다."),
].map((command) => command.toJSON());

const registerCommands = (token, clientId, guildId) => {
  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};

registerCommands(
  "OTg4MzAzNjgwODI0NTQ5NDA2.GOW8Bu.cPm-gVHCLduG3YUN-cpcO378atNuOF5x6IDG2U",
  "988303680824549406",
  "974461844423061504"
);

client.on("interactionCreate", async (interaction) => {
  // Original: https://discordjs.guide/interactions/replying-to-slash-commands.html#receiving-interactions
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "testmethod") {
    const modal = new Modal()
      .setCustomId("studyTimeUploader")
      .setTitle("공부시간을 업로드해주세요!");
    // Add components to modal
    // Create the text input components
    const videoTimeInput = new TextInputComponent()
      .setCustomId("videoTimeInput")
      .setLabel("영상시간을 입력해주세요.")
      .setStyle("SHORT");

    const youtubeWatchCountInput = new TextInputComponent()
      .setCustomId("youtubeWatchCountInput")
      .setLabel("유튜브 시청수를 입력해주세요.")
      .setStyle("SHORT");

    const baekjoonTimeInput = new TextInputComponent()
      .setCustomId("baekjoonTimeInput")
      .setLabel("백준 공부시간을 입력해주세요.")
      .setStyle("SHORT");

    const blogUploadCountInput = new TextInputComponent()
      .setCustomId("blogUploadCountInput")
      .setLabel("블로그 글 업로드 수를 입력해주세요.")
      .setStyle("SHORT");

    const firstActionRow = new MessageActionRow().addComponents(videoTimeInput);
    const secondActionRow = new MessageActionRow().addComponents(
      youtubeWatchCountInput
    );
    const thirdActionRow = new MessageActionRow().addComponents(
      baekjoonTimeInput
    );
    const fourthActionRow = new MessageActionRow().addComponents(
      blogUploadCountInput
    );

    // Add inputs to the modal
    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow
    );
    await interaction.showModal(modal);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  const videoTime = interaction.fields.getTextInputValue("videoTimeInput");
  const youtubeWatchCount = interaction.fields.getTextInputValue(
    "youtubeWatchCountInput"
  );
  const baekjoonTime =
    interaction.fields.getTextInputValue("baekjoonTimeInput");
  const blogUploadCount = interaction.fields.getTextInputValue(
    "blogUploadCountInput"
  );

  console.log("videoTime", videoTime);
  console.log("youtubeWatchCount", youtubeWatchCount);
  console.log("baekjoonTime", baekjoonTime);
  console.log("blogUploadCount", blogUploadCount);

  if (interaction.customId === "studyTimeUploader") {
    await interaction.reply({
      content: "성공적으로 등록되었습니다.",
    });
  }
});

//delete slashCommands
/*rest.get(Routes.applicationGuildCommands(clientId, guildId)).then((data) => {
  const promises = [];
  for (const command of data) {
    const deleteUrl = `${Routes.applicationGuildCommands(
      clientId,
      guildId
    )}/${command.id}`;
    promises.push(rest.delete(deleteUrl));
  }
  return Promise.all(promises);
});*/
