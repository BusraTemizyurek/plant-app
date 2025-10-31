import { Plant } from "@/models/plants";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<Plant[] | { error: string }>> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json(await Plant.findAll());
  }

  const token = authHeader.substring(7);

  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    const userId = verified.sub;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plants = await Plant.findAll({
      where: { userId },
    });

    return NextResponse.json(plants);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
