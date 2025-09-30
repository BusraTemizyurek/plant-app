import { Event } from "@/types";

export const getEvents = async () => {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json() as Promise<Event[]>;
};
