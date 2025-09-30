"use client";

import React from "react";
import { ChartDataPoint } from "@/types";

interface QuickStatsProps {
  chartData: ChartDataPoint[];
}

const QuickStats = ({ chartData }: QuickStatsProps) => {
  const average = Math.round(
    chartData.reduce((sum, d) => sum + d.moisture, 0) / chartData.length
  );
  const peak = Math.max(...chartData.map((d) => d.moisture));
  const low = Math.min(...chartData.map((d) => d.moisture));

  return (
    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
      <div className="text-center">
        <div className="text-2xl font-semibold text-gray-800">
          {average}%
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Average
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-semibold text-gray-800">
          {peak}%
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Peak
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-semibold text-gray-800">
          {low}%
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Low
        </div>
      </div>
    </div>
  );
};

export default QuickStats;