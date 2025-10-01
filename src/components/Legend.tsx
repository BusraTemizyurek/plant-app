"use client";

import React from "react";

const Legend = () => {
  return (
    <div className="flex items-center space-x-4 text-xs mt-3">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-orange-400 rounded mr-1"></div>
        <span className="text-gray-600">Dry (&lt;30%)</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-400 rounded mr-1"></div>
        <span className="text-gray-600">Healthy (30-60%)</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-blue-400 rounded mr-1"></div>
        <span className="text-gray-600">Overwatered (&gt;60%)</span>
      </div>
    </div>
  );
};

export default Legend;
