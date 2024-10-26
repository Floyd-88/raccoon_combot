import { ref, get, update, onValue, set } from "firebase/database";
import { database } from "../services/firebase";
import { TasksI, UserI } from "../types/type";
import { useTelegram } from "../services/telegram";
import { usePointStore } from "../stores/score";
import { useAppStore } from "../stores/app";

const { telegramUser } = useTelegram() || {};
const telegramID = telegramUser?.id ?? import.meta.env.VITE_TEST_TELEGRAM_ID;


export const fetchTasks = async (): Promise<Record<string, TasksI>> => {
  const userRef = ref(database, "tasks/");
  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data); // Разрешаем промис с данными
        } else {
          reject("No data available"); // Отклоняем промис в случае отсутствия данных
        }
      },
      (error) => {
        reject(error); // Отклоняем промис при ошибке
      }
    );
  });
};

export async function completeTask(userID: number, task: TasksI) {
    const point = usePointStore();
    const app = useAppStore(); 

    const newTotalPoints = point.totalPoints + task.amount;
    point.setPoint(newTotalPoints);

    const userRef = ref(database, `users/${userID}`);
    const updates = {
        [`tasks/${task.id}`]: true, 
        totalPoints: newTotalPoints 
    };

    try {
        await update(userRef, updates);

        const updatedTasks = {
          ...app.user?.tasks, // сохраняем предыдущие задачи
          [task.id]: true, // добавляем новую выполненную задачу
      };
      
      app.setUserTasks(updatedTasks);

        console.log("Task completed updated");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

export const getOrCreateUser = async (): Promise<UserI> => {
  if (!telegramID) {
    throw new Error("Telegram ID is not available");
  }

  const userRef = ref(database, `users/${telegramID}`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      // Если пользователь существует, возвращаем его данные
      return snapshot.val();
    } else {
      // Если пользователя нет, создаем его с дефолтными значениями
      const newUser: UserI = {
        id: telegramID, // Используем telegramID как уникальный идентификатор
        totalPoints: 0,
        friends: {},
        tasks: {},
      };

      await set(userRef, newUser); // Создаём пользователя в базе данных
      return newUser; // Возвращаем созданного пользователя
    }
  } catch (error) {
    console.error("Error fetching/creating user:", error);
    throw error;
  }
};

export const updateTotalPoints = async (totalPoints: number) => {
    const userRef = ref(database, `users/${telegramID}`);
    
    try {
        await update(userRef, { totalPoints });
    } catch (error) {
        console.error("Error updating total points:", error);
    }
}

export const registerRef = async (first_name: string, refId: string) => {
  const userRef = ref(database, `users/${refId}`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const friends = userData.friends || [];

      // Проверка, добавлен ли уже этот друг
      if (!friends.includes(first_name)) {
        // Обновляем список друзей и очки
        await update(userRef, {
          friends: {...friends, telegramID: first_name},
          totalPoints: (userData.totalPoints || 0) + 50,
        });
        console.log(`Друг ${first_name} добавлен и очки обновлены.`);
      }
    } else {
      console.error("Пользователь не найден.");
    }
  } catch (error) {
    console.error("Ошибка при обновлении данных пользователя:", error);
  }

}
