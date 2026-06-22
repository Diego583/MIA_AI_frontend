import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Simple auth check function
function checkAuth(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    return authHeader && authHeader.startsWith('Bearer ');
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        if (!checkAuth(request)) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const { amount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal error: ", error);
        // Handle other errors (e.g., network issues)
        return NextResponse.json(
            {
                error: `Internal Server Error: ${error}`,
            },
            { status: 500 }
        );
    }
}
