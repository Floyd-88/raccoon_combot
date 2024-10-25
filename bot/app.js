import { Telegraf, Markup } from "telegraf";
const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const webAppUrl = import.meta.env.VITE_WEB_URL_APP
const bot = new Telegraf(token);

bot.command("start", (ctx) => {
  const ref = ctx.message.text.split(" ")[1]; 
  const gameUrl = ref ? `${webAppUrl}?ref=${ref}` : webAppUrl; 

  ctx.reply(
    "Привет! Добро пожаловать в игру!",
    Markup.inlineKeyboard([
      Markup.button.webApp("Запустить игру", gameUrl),
    ])
  );
});

bot.launch();

