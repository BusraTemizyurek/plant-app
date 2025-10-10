import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/models/events";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ plantId: string }> }
): Promise<NextResponse<Event[]>> {
  const { plantId: plantIdString } = await params;
  const plantId = parseInt(plantIdString, 10);

  // Get latest 50 records in descending order, then reverse for chronological display
  const latestEvents = await Event.findAll({
    where: { plantId },
    attributes: ["id", "moisture", "timestamp", "plantId"],
    order: [["timestamp", "DESC"]],
    limit: 50,
  });

  // Reverse to get chronological order (earliest to latest) without expensive date parsing
  const data = latestEvents.reverse();

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ plantId: string }> }
) {
  try {
    const { plantId: plantIdString } = await params;
    const plantId = parseInt(plantIdString, 10);
    const body = await request.json();
    const { moisture } = body;

    if (typeof moisture !== "number") {
      return NextResponse.json(
        { error: "Invalid moisture value" },
        { status: 400 }
      );
    }

    await Event.create({ moisture, plantId });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
