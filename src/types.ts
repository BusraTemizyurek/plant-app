export type MoistureReading = [number, string];

export interface ChartDataPoint {
  moisture: number;
  time: string;
  displayTime: string;
}

export type PlantState = "dried" | "healthy" | "overwatered";
