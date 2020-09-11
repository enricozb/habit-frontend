import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { HabitSWR, HabitJSON } from "../types";

export function Stats() {
  // let habitStats: [{name?: string; dates?: Array<string>}]  = [{}]
  const {habitName} = useParams()

  let habitStats: { [name: string]: Array<string>} = { }

  const { data, error }: HabitSWR = useSWR("/habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (error !== undefined) {
    return <div>Error...</div>;
  }

  for (const key of data) {
    if (!(key.name in habitStats)) {
      var arr = [];
      arr.push(key.completeDate.toString().slice(0,10))
      habitStats[key.name] = arr
    } else {
      habitStats[key.name].push(key.completeDate.toString().slice(0,10))
    }
  }

  console.log(JSON.stringify(habitStats))


  // data -> {habitName: [date1.slice(0, 10), date2, date3, ...]
  

  return <div>{JSON.stringify(habitStats[habitName])}</div>;
}
