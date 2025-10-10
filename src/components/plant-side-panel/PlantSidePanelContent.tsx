import Link from "next/link";
import React from "react";
import { Plant } from "@/types";

interface PlantSidePanelContentProps {
  plants: Plant[];
  selectedPlantId?: number;
}

export const PlantSidePanelContent = ({
  plants,
  selectedPlantId,
}: PlantSidePanelContentProps) => {
  return (
    <div className="p-4 overflow-y-auto h-full">
      {plants.length === 0 && (
        <div className="text-gray-500 text-sm py-8 text-center">
          No plants found
        </div>
      )}

      {plants.length > 0 && (
        <div className="space-y-2">
          {plants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              className={`block w-full p-3 rounded-lg text-left transition-colors ${
                selectedPlantId === plant.id
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <p className="font-medium text-gray-800">
                    {plant.plantName || `Plant ${plant.id}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
