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
  moisture: number;
  lastUpdated: Date;
  userId: string;
}

export type PlantState = "dried" | "healthy" | "overwatered";
