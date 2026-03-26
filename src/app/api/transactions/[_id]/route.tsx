import { dbConnect } from "@/lib/dbConnect/dbConnections";
import Transaction from "@/lib/schemas/Transanctions";
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
        dbConnect();
        const transaction = await Transaction.deleteOne({ _id: _id, clerkId: userId });
        if (!transaction) {
            return NextResponse.json({
                message: "Transaction not found"
            }, { status: 404 })
        }
        return NextResponse.json({
            transaction: transaction,
            success: true,
            message: "Successful deletion of transaction",
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 }
        )
    }
}

// export async function PUT(request: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
//     try {
//         const { _id } = await params;
//         const { userId } = await auth();
//         if (!userId) {
//             return NextResponse.json({
//                 message: "Unauthorized"
//             }, { status: 401 })
//         }
//         dbConnect();
//         const { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } = await request.json();
//         const transaction = await Transaction.findOneAndUpdate(
//             { _id: _id, clerkId: userId },
//             { $set: { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } },
//             { new: true });

//         if (!transaction) {
//             return NextResponse.json({
//                 message: "Transaction not found"
//             }, { status: 404 })
//         }
//         return NextResponse.json({
//             transaction: transaction,
//             success: true,
//             message: "Successful update of transaction",
//         }, { status: 200 })
//     } catch (error) {
//         return NextResponse.json({
//             message: "Internal server error"
//         }, { status: 500 }
//         )
//     }
// }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
    try {
        const { _id } = await params;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } = await request.json();

        const transaction = await Transaction.findOneAndUpdate(
            { _id, clerkId: userId },
            { amount, type, category, description, date, paymentMethod, isEssential, isRecurring },
            { new: true }
        );

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