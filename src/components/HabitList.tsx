import React from "react";
import axios from "axios";
import useSWR, { mutate }  from "swr";

import { AddHabit } from "./AddHabit";

type HabitJSON = {
  email: string;
  name: string;
  completeDate: Date;
  remindTime: string;
};

type HabitSWR = {
  data?: HabitJSON[];
  error?: any;
};

export function HabitList() {
  const { data, error }: HabitSWR = useSWR("habit", (url) => (
    axios.get(url, {withCredentials: true}).then((res) => res.data)
  ));

  if (data === undefined) {
    return <div>Loading...</div>;
  } else {
    data.sort((habit1: any, habit2: any) =>
      habit1.time.localeCompare(habit2.time)
    );
  }

  console.log("data:", data);

  if (error !== undefined) {
    return <div>Error...</div>;
  }

  const completeHabit = (name: string) => {};

  return (
    <>
      <div>Habits</div>
      <AddHabit />
      <div className="habit-list">
        {data.map(({ name, remindTime }, i) => (
          <li key={i}>
            <button onClick={() => completeHabit(name)}>-</button>
            <span>{name}</span>
            <span>{remindTime}</span>
          </li>
        ))}
      </div>
    </>
  );
}
