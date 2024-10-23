import { Telegraf, Markup } from "telegraf";
const token = '7820936150:AAGox979ii0tRJZ7Lwoy9s1Q9QBxb8ifnOM'
const webAppUrl = 'https://raccoon-combo.web.app/'
const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    const ref = ctx.message.text.split(' ')[1];
    console.timeLog(ref)

    ctx.reply(
        `${webAppUrl}?ref=${ref}`,
        Markup.inlineKeyboard([
          Markup.button.webApp('Запустить игру', `${webAppUrl}?${ref}`) // Создание кнопки с переходом на URL
        ])
    )
})

bot.launch()