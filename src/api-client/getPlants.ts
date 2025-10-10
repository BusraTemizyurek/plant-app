import { Plant } from "@/types";

export const getPlants = async () => {
  const response = await fetch("/api/plants");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json() as Promise<Plant[]>;
};
