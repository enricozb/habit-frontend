import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

import { HabitSWR } from "../types";

export function AddHabit() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const { data, error }: HabitSWR = useSWR("habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  const submit = async () => {
    const habitEntry = {
      email: "ab@gmail.com",
      name,
      completeDate: new Date(),
      remindTime: time,
    };

    if (data === undefined) {
      return;
    }

    mutate("habit", [...data, habitEntry], false);

    await axios.post(
      "habit",
      habitEntry
    );

    mutate("habit");
  };

  return (
    <div>
      <label>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTime(e.target.value);
          }}
        />
      </label>
      <button onClick={submit}>+</button>
    </div>
  );
}
