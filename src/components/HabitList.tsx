import React from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

import { AddHabit } from "./AddHabit";

import { HabitSWR, HabitJSON } from "../types";

export function HabitList() {
  const { data, error }: HabitSWR = useSWR("habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  const habits: Record<string, Record<string, string>> = {};

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (error !== undefined) {
    return <div>Error...</div>;
  }

  for (const habit of data) {
    habits[habit.name] = { time: habit.remindTime };
  }

  const completeHabit = async (name: string) => {
    const habitEntry = {
      email: "ab@gmail.com",
      name,
      completeDate: new Date(),
      remindTime: habits[name].time,
    };

    if (data === undefined) {
      return;
    }

    mutate("habit", [...data, habitEntry], false);

    await axios.post("habit", habitEntry);

    mutate("habit");
  };

  const sortedHabits = () => {
    const habitsArray = Object.entries(habits).map(([name, { time }]) => ({
      name,
      time,
    }));
    habitsArray.sort((habit1: any, habit2: any) =>
      habit1.time.localeCompare(habit2.time)
    );
    return habitsArray;
  };

  return (
    <>
      <div>Habits</div>
      <AddHabit />
      <div className="habit-list">
        {sortedHabits().map(({ name, time }, i) => (
          <li key={i}>
            <button onClick={async () => await completeHabit(name)}>-</button>
            <a href={`stats/${name}`}>stats</a>
            <span>{name}</span>
            <span>{time}</span>
          </li>
        ))}
      </div>
    </>
  );
}
