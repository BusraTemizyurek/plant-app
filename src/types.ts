export interface ChartDataPoint {
  moisture: number;
  time: string;
  displayTime: string;
}

export type PlantState = "dried" | "healthy" | "overwatered";

export type Event = {
  id: number;
  moisture: number;
  timestamp: string;
};
