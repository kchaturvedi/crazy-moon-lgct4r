import { useState, useEffect } from "react";
import _ from "lodash";

import Card from "../components/Card";

const directionsMap = {
  E: "East",
  W: "West",
  N: "North",
  S: "South",
};

export default function Home() {
  const fetchAndProcess = async () => {
    const response = await fetch("/api/realtimeArrivals");
    const data = await response.json();
    const rawRoutes = data
      .map((r) => {
        r.color = _.lowerCase(r.LINE);
        r.LINE = _.startCase(_.capitalize(r.LINE));
        r.STATION = _.startCase(_.capitalize(r.STATION));
        r.DESTINATION = _.startCase(_.capitalize(r.DESTINATION));
        r.DIRECTION = directionsMap[r.DIRECTION];
        r.WAITING_SECONDS = parseInt(r.WAITING_SECONDS, 10);
        r.key = r.WAITING_SECONDS + r.TRAIN_ID;
        return r;
      })
      .sort((a, b) => (a.WAITING_SECONDS < b.WAITING_SECONDS ? -1 : 1));
    setAllRoutes(rawRoutes);
  };

  const [allRoutes, setAllRoutes] = useState([]);
  const allStations = [...new Set(allRoutes.map((s) => s.STATION))];
  const allLines = [...new Set(allRoutes.map((s) => s.LINE))];
  const allDestinations = [...new Set(allRoutes.map((s) => s.DESTINATION))];

  const [selectedStation, setStation] = useState("");
  const [selectedLine, setLine] = useState("");
  const [selectedDestination, setDestination] = useState("");

  const [routes, setRoutes] = useState(allRoutes);

  useEffect(() => {
    fetchAndProcess();
  }, []);

  useEffect(() => {
    setRoutes(
      allRoutes
        .filter((r) => selectedStation === "" || r.STATION === selectedStation)
        .filter((r) => selectedLine === "" || r.LINE === selectedLine)
        .filter(
          (r) =>
            selectedDestination === "" || r.DESTINATION === selectedDestination
        )
    );
  }, [allRoutes, selectedStation, selectedLine, selectedDestination]);

  return (
    <main>
      <div className='max-w-4xl mx-auto justify-center p-4'>
        <h1 className='text-3xl mb-8 text-center'>Hello Marta</h1>
        <div className='flex flex-col md:flex-row mx-auto justify-center gap-4 text-xl'>
          <select className='w-full md:w-1/3' name='station' id='station' onChange={(e) => setStation(e.target.value)}>
            <option value=''>All Stations</option>
            {allStations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select name='station' id='station' onChange={(e) => setLine(e.target.value)}>
            <option value=''>All Lines</option>
            {allLines.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select name='station' id='station' onChange={(e) => setDestination(e.target.value)}>
            <option value=''>All Destinations</option>
            {allDestinations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className='border border-gray-400 p-2 rounded hover:shadow-lg hover:bg-gray-200' onClick={() => fetchAndProcess()}>
            Refresh
          </button>
        </div>
        <div className='flex flex-col max-w-xl mx-auto gap-4 py-8 w-full justify-center'>
          {routes.length === 0 && (
            <div className='flex justify-center bg-white border border-t-4 border-t-gray-400 p-4 rounded-lg'>
              <span className='text-lg font-semibold'>No routes between your origin and destination</span>
            </div>
          )}
          {routes.map((r) => (
            <Card route={r} />
          ))}
        </div>
      </div>
    </main>
  )
}
