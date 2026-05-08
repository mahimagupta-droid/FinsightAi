import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const deleted = await prisma.budget.delete({
        where: {
            id,
            clerkId: userId,
        },
    });
    if (!deleted) {
        return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Budget deleted successfully" });
}