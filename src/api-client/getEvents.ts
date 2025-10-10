import { Event } from "@/types";

export const getEvents = async (plantId: number) => {
  const response = await fetch(`/api/plants/${plantId}/events`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json() as Promise<Event[]>;
};
