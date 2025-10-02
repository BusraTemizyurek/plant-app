"use client";

import React, { useEffect, useState } from "react";
import { ChartDataPoint } from "@/types";
import Header from "./Header";
import PlantVisual from "./PlantVisual";
import MoistureChart from "./MoistureChart";
import { getEvents } from "@/api-client/getEvents";
import { Event } from "@/types";

const PlantMoistureDashboard = () => {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  if (!events) {
    return null;
  }

  if (events.length === 0) {
    return <div>No data available</div>;
  }

  const lastTime = events[events.length - 1].timestamp;
  const timePassed = Date.now() - new Date(lastTime).getTime();
  const isLive = timePassed <= 3600000; // 60 minutes in milliseconds

  // Process the data for chart
  const chartData: ChartDataPoint[] = events.map((event) => {
    const date = new Date(event.timestamp);
    return {
      moisture: event.moisture,
      time: date.toISOString(),
      displayTime: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
  });

  const currentMoisture = chartData[chartData.length - 1]?.moisture || 0;
  const lastReadingTime = chartData[chartData.length - 1]?.displayTime || "";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Header isLive={isLive} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PlantVisual
              currentMoisture={currentMoisture}
              lastReadingTime={lastReadingTime}
            />
          </div>

          <div className="lg:col-span-2">
            <MoistureChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantMoistureDashboard;
