"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Store = () => {
    const amount = 29.99;

    return (
        <div className="py-6">
            <div className="mb-10">
                <h2>Buy 1000 tokens for: ${amount}</h2>
            </div>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "usd",
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
};

export default Store;
