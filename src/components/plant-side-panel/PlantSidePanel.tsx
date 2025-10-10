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

  const [isMobile, setIsMobile] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (plants.length > 0) {
      return;
    }
    getPlants().then(setPlants);
  }, [plants.length]);

  const handleTogglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  if (isMobile) {
    return (
      <>
        {!isPanelOpen ? (
          <PlantSidePanelToggleButton onToggle={handleTogglePanel} />
        ) : (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleTogglePanel}
            />
            <div className="fixed top-0 left-0 h-full z-50 bg-white shadow-lg w-60">
              <PlantSidePanelHeader onToggle={handleTogglePanel} />
              <PlantSidePanelContent
                plants={plants}
                selectedPlantId={selectedPlantId}
              />
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {!isPanelOpen ? (
        <PlantSidePanelToggleButton onToggle={handleTogglePanel} />
      ) : (
        <div className="bg-white shadow-lg transform transition-transform duration-300 ease-in-out w-60">
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
