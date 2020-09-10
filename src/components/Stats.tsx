import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";

import { HabitSWR, HabitJSON } from "../types";

export function Stats() {
  let { habitName } = useParams();

  const { data, error }: HabitSWR = useSWR("http://localhost:3000/habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  // data -> {habitName: [date1.slice(0, 10), date2, date3, ...]

  return <div>stats for {JSON.stringify(data)}</div>;
}
