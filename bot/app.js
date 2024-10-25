import { Telegraf, Markup } from "telegraf";
const token = '7820936150:AAGox979ii0tRJZ7Lwoy9s1Q9QBxb8ifnOM'
const webAppUrl = 'https://raccoon-combo.web.app/'
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

