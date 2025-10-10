"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ChartDataPoint } from "@/types";
import Header from "./Header";
import { PlantVisual } from "./PlantVisual";
import { MoistureChart } from "./MoistureChart";
import { getEvents } from "@/api-client/getEvents";
import { Event } from "@/types";
import { NoMoistureData } from "./NoMoistureData";

export const PlantMoistureDashboard = () => {
  const params = useParams();
  const selectedPlantId = params.plantId
    ? parseInt(params.plantId as string, 10)
    : undefined;

  const [events, setEvents] = useState<Event[] | null>(null);

  // Memoize expensive calculations - must be called before any conditional returns
  const { isLive, chartData, currentMoisture, lastReadingTime } =
    useMemo(() => {
      if (!events || events.length === 0) {
        return {
          isLive: false,
          chartData: [] as ChartDataPoint[],
          currentMoisture: 0,
          lastReadingTime: "",
        };
      }

      const lastTime = events[events.length - 1].timestamp;
      const timePassed = Date.now() - new Date(lastTime).getTime();
      const isLive = timePassed <= 3600000; // 60 minutes in milliseconds

      // Process the data for chart
      const chartData = events.map((event) => {
        const date = new Date(event.timestamp);
        return {
          moisture: event.moisture,
          displayTime: date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        };
      });

      const currentMoisture = chartData[chartData.length - 1]?.moisture || 0;
      const lastReadingTime =
        chartData[chartData.length - 1]?.displayTime || "";

      return { isLive, chartData, currentMoisture, lastReadingTime };
    }, [events]);

  useEffect(() => {
    if (selectedPlantId) {
      getEvents(selectedPlantId).then(setEvents);
    }
  }, [selectedPlantId]);

  if (!events) {
    return <div>Plant data does not exist...</div>;
  }

  return (
    <div className={`flex-1 transition-all ease-in-out duration-100`}>
      <div className="p-4">
        <Header isLive={isLive} />

        {events.length === 0 ? (
          <NoMoistureData />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              <div className="md:col-span-2 xl:col-span-1 order-2 md:order-1">
                <PlantVisual
                  currentMoisture={currentMoisture}
                  lastReadingTime={lastReadingTime}
                />
              </div>

              <div className="md:col-span-2 xl:col-span-2 order-1 md:order-2">
                <MoistureChart chartData={chartData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
