"use client";

import React, { useCallback, useState, useEffect } from "react";
import { PlantSidePanelHeader } from "./PlantSidePanelHeader";
import { PlantSidePanelContent } from "./PlantSidePanelContent";
import { PlantSidePanelToggleButton } from "./PlantSidePanelToggleButton";
import { useParams } from "next/navigation";
import { getPlants } from "@/api-client/getPlants";
import { Plant } from "@/types";

export const PlantSidePanel = () => {
  const params = useParams();
  const selectedPlantId = params.plantId
    ? parseInt(params.plantId as string, 10)
    : undefined;

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    if (plants.length > 0) {
      return;
    }
    getPlants().then(setPlants);
  }, [plants.length]);

  const handleTogglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  return (
    <>
      {!isPanelOpen ? (
        <PlantSidePanelToggleButton onToggle={handleTogglePanel} />
      ) : (
        <div
          className={`bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isPanelOpen ? "translate-x-0" : "-translate-x-full"
          } w-60`}
        >
          <PlantSidePanelHeader onToggle={handleTogglePanel} />
          <PlantSidePanelContent
            plants={plants}
            selectedPlantId={selectedPlantId}
          />
        </div>
      )}
    </>
  );
};
