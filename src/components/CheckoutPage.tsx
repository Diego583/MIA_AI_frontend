"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loading from "./ui/loading";
import axios from "axios";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post(
                    "/api/create-payment-intent",
                    {
                        amount: convertToSubcurrency(amount),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };

        createPaymentIntent();
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}`, // TODO: Make dynamic
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error
            // when confirming the payment. Show the error to your customer (for example, payment
            // details incomplete).
            setErrorMessage(error.message);
        } else {
            // The payment has been processed!
            // This point is reached if the payment is successful.
            // You can now redirect to a new page or show a success message to your customer.
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
                disabled={!stripe || loading}
                className="text-text-foreground w-full p-5 bg-black mt-2 rounded-md 
                font-bold hover:opacity-50 disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay ${amount}` : "Processing..."}
            </button>
        </form>
    );
};

export default CheckoutPage;
