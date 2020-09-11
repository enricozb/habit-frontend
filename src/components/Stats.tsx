import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { HabitSWR, HabitJSON } from "../types";

export function Stats() {
  const {habitName} = useParams()
  let habitStats: { [name: string]: Array<string>} = { }
  const { data, error }: HabitSWR = useSWR("http://localhost:3000/habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );
  if (!data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  // create useStats hook
  // put this in useStats hook and return the transformed data
  // useStats instead of useSWR
  // sstore result of transformation with useState inside the useStats hook
  // https://swr.vercel.app/getting-started
  for (const key of data) {
    if (!(key.name in habitStats)) {
      var arr = [];
      arr.push(key.completeDate.toString().slice(0,10))
      habitStats[key.name] = arr
    } else {
      habitStats[key.name].push(key.completeDate.toString().slice(0,10))
    }
  }

  habitStats[habitName].sort()

  console.log(JSON.stringify(habitStats))
  return <div>
    {JSON.stringify(habitStats[habitName])}
    </div>;
}
