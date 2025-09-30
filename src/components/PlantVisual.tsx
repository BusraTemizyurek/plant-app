"use client";

import React from "react";
import Image from "next/image";

interface PlantVisualProps {
  currentMoisture: number;
  lastReadingTime: string;
}

const PlantVisual = ({
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
          className="w-80 h-80 object-contain drop-shadow-lg"
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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-6">{getPlantImage(currentMoisture)}</div>

        <div className="text-center">
          <div className="text-4xl font-light text-gray-800 mb-2">
            {currentMoisture}
            <span className="text-2xl text-gray-500">%</span>
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
        </div>
      </div>
    </div>
  );
};

export default PlantVisual;
