import Link from "next/link";

export default function PaymentSuccess({
    searchParams: { amount },
}: {
    searchParams: { amount: string };
}) {
    return (
        <main className="flex flex-col min-h-screen max-w-6xl mx-auto justify-center items-center text-center space-y-4">
            <h1>Thank you!</h1>
            <h2>1000 tokens have been added to your account.</h2>
            <Link href="/chats" className="text-primary underline">
                Start chatting
            </Link>
        </main>
    );
}
