import { signInWithCustomToken, getAuth, signOut } from "firebase/auth";

// Функция для запроса кастомного токена от сервера
async function getCustomToken(telegramUserId: any) {
  const response = await fetch("https://my-portfolioit.store/generateToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegramUserId })
  });
  const data = await response.json();
  return data.token;
}

// Функция для аутентификации с кастомным токеном
export async function authenticateWithCustomToken(telegramUserId: any) {
  try {
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut(auth);
    }
    
    const token = await getCustomToken(String(telegramUserId));
    await signInWithCustomToken(auth, token);
    console.log("Пользователь аутентифицирован.");
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    throw error;
  }
}
