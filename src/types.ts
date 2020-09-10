export type HabitJSON = {
  email: string;
  name: string;
  completeDate: Date;
  remindTime: string;
};

export type HabitSWR = {
  data?: HabitJSON[];
  error?: any;
};
