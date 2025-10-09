import { Plant } from "@/models/plants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Plant[]>> {
  const plants = await Plant.findAll();

  return NextResponse.json(plants);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plantName } = body;

    await Plant.create({ plantName });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create plant" },
      { status: 500 }
    );
  }
}
