import { Plant } from "@/models/plants";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Plant[]>> {
  const plants = await Plant.findAll();

  return NextResponse.json(plants);
}
