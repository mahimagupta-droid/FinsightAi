import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getExpenseSpikes } from "../../lib/insights";
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const spikes = await getExpenseSpikes(userId);

  return NextResponse.json({ success: true, spikes });
}
