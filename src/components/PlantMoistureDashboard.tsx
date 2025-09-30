"use client";

import React from "react";
import { mockMoistureData } from "@/data/mockData";
import { ChartDataPoint } from "@/types";
import Header from "./Header";
import PlantVisual from "./PlantVisual";
import MoistureChart from "./MoistureChart";
import QuickStats from "./QuickStats";

const PlantMoistureDashboard = () => {
  // Process the data for chart
  const chartData: ChartDataPoint[] = mockMoistureData.map(
    ([moisture, timestamp]) => {
      const date = new Date(timestamp);
      return {
        moisture,
        time: date.toISOString(),
        displayTime: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
    }
  );

  const currentMoisture = chartData[chartData.length - 1]?.moisture || 0;
  const lastReadingTime = chartData[chartData.length - 1]?.displayTime || "";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PlantVisual
              currentMoisture={currentMoisture}
              lastReadingTime={lastReadingTime}
            />
          </div>

          <div className="lg:col-span-2">
            <MoistureChart chartData={chartData} />
            <QuickStats chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantMoistureDashboard;
