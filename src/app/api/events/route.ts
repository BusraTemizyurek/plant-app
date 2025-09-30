import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/types";

export async function GET(): Promise<NextResponse<Event[]>> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Database URL is missing");
  }

  const sql = neon(url);
  const data = (await sql`
SELECT * FROM (
  SELECT * FROM events 
  ORDER BY timestamp DESC 
  LIMIT 50
) AS recent_events 
ORDER BY timestamp ASC;
`) as Event[];

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Database URL is missing");
  }

  try {
    const body = await request.json();
    const { moisture } = body;

    if (typeof moisture !== "number") {
      return NextResponse.json(
        { error: "Invalid moisture value" },
        { status: 400 }
      );
    }

    const sql = neon(url);
    await sql`INSERT INTO events (moisture) VALUES (${moisture})`;

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
