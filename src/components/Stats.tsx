import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { HabitSWR, HabitJSON } from "../types";

export function Stats() {
  const { habitName } = useParams()

  const [habitStatsReformat, setHSR] = useState({} as { [habitDate: string]: number })
  const { data, error }: HabitSWR = useSWR("http://localhost:3000/habit", (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data)
  );
  useEffect(() => {
    let habitStats: { [name: string]: Array<string> } = {}
    if (!data)
      return
    for (const key of data) {
      if (!(key.name in habitStats)) {
        const arr = [];
        arr.push(key.completeDate.toString().slice(0, 10))
        habitStats[key.name] = arr
      } else {
        habitStats[key.name].push(key.completeDate.toString().slice(0, 10))
      }
    }

    habitStats[habitName].sort()
    for (const index in habitStats[habitName]) {
      if (!(habitStats[habitName][index] in habitStatsReformat)) {
        habitStatsReformat[habitStats[habitName][index]] = 1
      } else {
        habitStatsReformat[habitStats[habitName][index]]++
      }
    }
    setHSR({ ...habitStatsReformat })
  }, [data])

  if (!data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return <div>
    <div className="habit-stats">
      {
        Object.entries(habitStatsReformat).map(([key, val], i) => (
          <p key={i}>
            <span>Date: {key} </span>
            <span>
              Completed:
          </span>
            {[...Array(val)].map((e, k) =>
              <span className="points" key={k}>+</span>
            )}
          </p>
        ))
      }
    </div>
  </div>
}





