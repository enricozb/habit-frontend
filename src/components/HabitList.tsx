import React from "react";
import axios from "axios";
import useSWR from "swr";

import { AddHabit } from "./AddHabit";

export function HabitList() {
  // const { data, error } = useSWR("localhost:9000/api/task", axios);

  const data = [
    { name: "Cook", time: "11:00", completed: false },
    { name: "Read", time: "20:00", completed: false },
    { name: "Exercise", time: "08:30", completed: false },
  ];
  data.sort((habit1, habit2) => habit1.time.localeCompare(habit2.time));

  const completeHabit = (name: string) => {};

  return (
    <>
      <div>Habits</div>
      <AddHabit />
      <div className="habit-list">
        {data.map(({ name, time, completed }, i) => (
          <li key={i} className={completed ? "completed" : ""}>
            <button onClick={() => completeHabit(name)}>-</button>
            <span>{name}</span>
            <span>{time}</span>
          </li>
        ))}
      </div>
    </>
  );
}
