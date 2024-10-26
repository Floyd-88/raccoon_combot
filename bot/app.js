import { Telegraf, Markup } from "telegraf";
const token = "7820936150:AAGox979ii0tRJZ7Lwoy9s1Q9QBxb8ifnOM"
const webAppUrl = "https://raccoon-combo.web.app/"
const bot = new Telegraf(token);

bot.command("start", (ctx) => {
console.log(ctx)
  ctx.reply(
    "Привет! Добро пожаловать в игру!",
    Markup.inlineKeyboard([
      Markup.button.webApp("Запустить игру", `${webAppUrl}?ref=${ctx.payload}`),
    ])
  );
});

bot.launch();

