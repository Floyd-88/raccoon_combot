export function useTelegram() {
  console.log(12)
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const telegramUser = tg.initDataUnsafe?.user;
      return {
        tg,
        telegramUser,
      };
    }
    return {}; // Вернуть пустой объект, если Telegram SDK не загружен
  }
