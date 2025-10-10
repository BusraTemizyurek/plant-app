"use client";

import React from "react";
import Image from "next/image";
import Legend from "./Legend";

interface PlantVisualProps {
  currentMoisture: number;
  lastReadingTime: string;
}

export const PlantVisual = ({
  currentMoisture,
  lastReadingTime,
}: PlantVisualProps) => {
  const getPlantState = (moisture: number) => {
    if (moisture < 30) return "dry";
    if (moisture <= 60) return "healthy";
    return "overwatered";
  };

  const plantImages = {
    dry: {
      src: "/plants/dried.png",
      alt: "Dried plant",
    },
    healthy: {
      src: "/plants/healthy.png",
      alt: "Healthy plant",
    },
    overwatered: {
      src: "/plants/overwatered.png",
      alt: "Overwatered plant",
    },
  };

  const getPlantImage = (moisture: number) => {
    const state = getPlantState(moisture);
    const image = plantImages[state];

    return (
      <div className="relative">
        <Image
          src={image.src}
          alt={image.alt}
          className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-lg"
          width={320}
          height={320}
        />
      </div>
    );
  };

  const getStatusColor = (moisture: number): string => {
    if (moisture < 30) return "text-orange-600";
    if (moisture <= 60) return "text-green-600";
    return "text-blue-600";
  };

  const getStatusText = (moisture: number): string => {
    if (moisture < 30) return "Needs Water";
    if (moisture <= 60) return "Healthy";
    return "Overwatered";
  };

  const getStatusBg = (moisture: number): string => {
    if (moisture < 30) return "bg-orange-50";
    if (moisture <= 60) return "bg-green-50";
    return "bg-blue-50";
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div>{getPlantImage(currentMoisture)}</div>

        <div className="text-center mt-2 sm:mt-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 mb-2">
            {currentMoisture}
            <span className="text-lg sm:text-xl lg:text-2xl text-gray-500">%</span>
          </div>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
              currentMoisture
            )} ${getStatusBg(currentMoisture)}`}
          >
            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
            {getStatusText(currentMoisture)}
          </div>
          <div className="text-xs text-gray-400 mt-3">
            Last reading: {lastReadingTime}
          </div>
          <Legend />
        </div>
      </div>
    </div>
  );
};
