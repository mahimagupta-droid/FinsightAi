import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
    try {
        const { _id } = await params;
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 })
        }
        const transaction = await prisma.transaction.delete({
            where: {
                clerkId: userId,
                id: _id,
            },
        });
        if (!transaction) {
            return NextResponse.json({
                message: "Transaction not found"
            }, { status: 404 })
        }
        return NextResponse.json({
            transaction: transaction,
            success: true,
            message: "Transaction successfully deleted",
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
    try {
        const { _id } = await params;
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } = await request.json();
        const transaction = await prisma.transaction.update({
            where: {
                clerkId: userId,
                id: _id,
            },
            data: { amount, type, category, description, date, paymentMethod, isEssential, isRecurring },
        });
        if (!transaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            transaction,
            message: "Transaction updated successfully",
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}