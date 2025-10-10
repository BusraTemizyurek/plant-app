export interface ChartDataPoint {
  moisture: number;
  displayTime: string;
}

export type Event = {
  id: number;
  moisture: number;
  timestamp: string;
  plantId: number;
};

export interface Plant {
  id: number;
  plantName: string;
}

export type PlantState = "dried" | "healthy" | "overwatered";
