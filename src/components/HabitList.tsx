import React from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

import { AddHabit } from "./AddHabit";

import { HabitSWR, HabitJSON } from "../types";

export function HabitList() {
  const { data, error }: HabitSWR = useSWR("habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  if (data === undefined) {
    return <div>Loading...</div>;
  } else {
    data.sort((habit1: HabitJSON, habit2: HabitJSON) =>
      habit1.remindTime.localeCompare(habit2.remindTime)
    );
  }

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
