import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import useSWR from "swr";

export function AddHabit() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const submit = () => {
    console.log(name, time);
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
