"use client";

import React from "react";

const ChartLegend = () => {
  return (
    <div className="flex items-center space-x-4 text-xs">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-orange-400 rounded mr-2"></div>
        <span className="text-gray-600">Dry (&lt;30%)</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
        <span className="text-gray-600">Healthy (30-60%)</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
        <span className="text-gray-600">Overwatered (&gt;60%)</span>
      </div>
    </div>
  );
};

export default ChartLegend;