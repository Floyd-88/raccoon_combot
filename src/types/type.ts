export interface LevelImagesI {
    level_1: string;
    level_2: string;
    level_3: string;
    level_4: string;
    level_5: string;
    level_6: string;
  }

  export interface TasksI { 
    id: string,
    title: string,
    url: string,
    amount: number
  }

  // interface FriendsI {
  //   url: string
  // }

  // interface UserTasksI {
  //   string: boolean
  // }

  export interface UserI {
    id: number,
    totalPoints: number,
    friends: Record<string, string>,
    tasks: Record<string, string>
  }