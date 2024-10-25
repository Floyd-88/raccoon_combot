export function useTelegram() {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const telegramUser = tg.initDataUnsafe?.user;
      return {
        tg,
        telegramUser,
      };
    }
    return {};
  }
