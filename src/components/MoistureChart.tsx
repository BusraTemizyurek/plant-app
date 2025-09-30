"use client";

import React from "react";
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis } from "recharts";
import { ChartDataPoint } from "@/types";
import ChartLegend from "./ChartLegend";
import QuickStats from "./QuickStats";

interface MoistureChartProps {
  chartData: ChartDataPoint[];
}

const MoistureChart = ({ chartData }: MoistureChartProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            Moisture Timeline
          </h2>
          <p className="text-sm text-gray-500">Recent moisture readings</p>
        </div>

        <ChartLegend />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="displayTime"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              tickFormatter={(value) => `${value}%`}
            />

            <Area
              type="monotone"
              dataKey="moisture"
              stroke="#22C55E"
              strokeWidth={3}
              fill="url(#moistureGradient)"
              dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: "#22C55E",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <QuickStats chartData={chartData} />
    </div>
  );
};

export default MoistureChart;
