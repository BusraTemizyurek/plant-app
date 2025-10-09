import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/models/events";

export async function GET(): Promise<NextResponse<Event[]>> {
  const latestEvents = await Event.findAll({
    attributes: ["id", "moisture", "timestamp"],
    order: [["timestamp", "DESC"]],
    limit: 50,
  });

  const data = latestEvents.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

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
