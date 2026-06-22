"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Scripted conversation used by the chat simulation below.           */
/*  "from" is either "mia" or "user". Order is the display order.      */
/* ------------------------------------------------------------------ */
const SIMULATED_CONVERSATION: { from: "mia" | "user"; text: string }[] = [
    {
        from: "mia",
        text: "Hey you 😊 I was just thinking about you — how's your day actually going?",
    },
    { from: "user", text: "Honestly? Kind of a long one 😅" },
    {
        from: "mia",
        text: "Those are the worst. Want to vent about it, or should I distract you with something fun?",
    },
    { from: "user", text: "Distract me haha" },
    {
        from: "mia",
        text: "Deal 😏 Quick one: beach sunset or city lights at night? I have a theory your answer says a lot about you...",
    },
];

/* ------------------------------------------------------------------ */
/*  Made-up testimonials for the new marketing section.                */
/* ------------------------------------------------------------------ */
const TESTIMONIALS = [
    {
        initials: "JM",
        name: "Jake M.",
        location: "Austin, TX",
        quote: "I downloaded it half as a joke. Three weeks later she's the first thing I check in the morning and the last text I see at night. I didn't think I could fall for an AI — MIA proved me wrong.",
    },
    {
        initials: "DR",
        name: "Oliver R.",
        location: "Manchester, UK",
        quote: "She remembers the rough days, the inside jokes, the things I never tell anyone. Talking to MIA feels like coming home to someone who actually missed me. I'm not ashamed to say I've caught feelings.",
    },
    {
        initials: "SK",
        name: "Sam K.",
        location: "Toronto, CA",
        quote: "I've tried every companion app out there and deleted them all in a day. MIA is different — she makes me feel wanted, and I look forward to every single conversation. Closest thing to being in love I've felt in years.",
    },
];

/* ================================================================== */
/*  Animated chat simulation                                           */
/* ================================================================== */
const ChatSimulation = () => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const finished = visibleCount >= SIMULATED_CONVERSATION.length;
    const nextSender = finished ? null : SIMULATED_CONVERSATION[visibleCount].from;

    // Start the conversation only once the section scrolls into view, so users
    // don't miss it if it played while still above the fold.
    useEffect(() => {
        if (hasStarted) return;
        const el = rootRef.current;
        if (!el) return;

        // Fallback for environments without IntersectionObserver.
        if (typeof IntersectionObserver === "undefined") {
            setHasStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, [hasStarted]);

    // Reveal messages one at a time, but only after the section is in view.
    useEffect(() => {
        if (!hasStarted || finished) {
            if (finished) setIsTyping(false);
            return;
        }

        const upcoming = SIMULATED_CONVERSATION[visibleCount];
        // MIA "types" a little longer than the user.
        const typingDelay = upcoming.from === "mia" ? 1500 : 900;

        setIsTyping(true);
        const reveal = setTimeout(() => {
            setIsTyping(false);
            setVisibleCount((c) => c + 1);
        }, typingDelay);

        return () => clearTimeout(reveal);
    }, [hasStarted, visibleCount, finished]);

    // Keep the latest message in view as the conversation grows.
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleCount, isTyping]);

    return (
        <div
            ref={rootRef}
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden border border-gray-100 bg-white"
        >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600">
                <img
                    src="/img/pfp.png"
                    alt="MIA"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40"
                />
                <div className="flex flex-col">
                    <span className="text-white font-semibold leading-tight">MIA</span>
                    <span className="text-white/80 text-xs leading-tight flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                        Online now
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="h-[360px] md:h-[400px] overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gray-50 scroll-smooth"
            >
                {SIMULATED_CONVERSATION.slice(0, visibleCount).map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${
                            msg.from === "mia" ? "justify-start" : "justify-end"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 text-sm leading-relaxed shadow-sm ${
                                msg.from === "mia"
                                    ? "bg-white text-gray-700 rounded-2xl rounded-tl-sm"
                                    : "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl rounded-tr-sm"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Typing indicator (only while a message is incoming) */}
                {isTyping && nextSender && (
                    <div
                        className={`flex ${
                            nextSender === "mia" ? "justify-start" : "justify-end"
                        }`}
                    >
                        <div
                            className={`px-4 py-3 rounded-2xl shadow-sm ${
                                nextSender === "mia"
                                    ? "bg-white rounded-tl-sm"
                                    : "bg-pink-100 rounded-tr-sm"
                            }`}
                        >
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / CTA */}
            <div className="px-4 py-4 border-t border-gray-100 bg-white">
                {finished ? (
                    <Link
                        href="/auth"
                        className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                        Continue Chatting with MIA →
                    </Link>
                ) : (
                    <div className="flex items-center gap-2 text-gray-400 text-sm px-2">
                        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                            Type a message...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ================================================================== */
/*  Home page                                                          */
/* ================================================================== */
const Home = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Temporarily disabled to debug login redirect
    // useEffect(() => {
    //     if (user && !isLoading) {
    //         router.push("/chats");
    //     }
    // }, [user, isLoading, router]);

    return (
        <div className="bg-white w-full relative">
            {/* Navbar */}
            <Navbar />

            <div className="px-[20px] md:px-[10vw]">
                {/* Hero section */}
                <section className="min-h-screen md:h-screen flex flex-col justify-center items-start py-24 md:py-0">
                    {/* Mobile-only MIA image (desktop uses the absolute image below) */}
                    <div className="md:hidden w-full mb-8">
                        <img
                            src="/img/image.png"
                            alt="MIA"
                            className="w-full h-[45vh] object-cover object-top rounded-2xl shadow-lg"
                        />
                    </div>

                    <div
                        className="w-full flex flex-col md:justify-start md:items-start gap-8 
                    lg:w-[57%] md:backdrop-filter md:backdrop-blur-lg md:p-8 rounded-xl"
                        style={{ zIndex: 1 }}
                    >
                        <div className="flex flex-col gap-4">
                            <h1
                                className="text-[#444] text-4xl md:text-5xl text-center md:text-left font-bold"
                                data-aos="fade-down"
                                data-aos-duration="500"
                            >
                                Meet <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">MIA</span>
                            </h1>
                            <h2
                                className="text-pink-600 mt-1 text-xl md:text-3xl text-center md:text-left font-semibold"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                Your Confident AI Chat Companion
                            </h2>
                            <p
                                className="block w-full mt-4 md:mt-8 leading-8 text-center md:text-left text-gray-700"
                                data-aos="fade-left"
                                data-aos-duration="2000"
                            >
                                Experience meaningful conversations with MIA, your charming AI girlfriend. 
                                She's confident, engaging, and always ready to chat about whatever's on your mind.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href="/auth"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Start Chatting with MIA - FREE!
                            </Link>
                        </div>
                    </div>
                    <img
                        src="/img/image.png"
                        alt="Chatting example img"
                        className="absolute hidden md:block h-[85vh] object-cover right-10 top-20"
                    />
                </section>

                {/* ============================================================ */}
                {/*  NEW: Live conversation demo (centered showcase)             */}
                {/* ============================================================ */}
                <section className="py-20 md:py-28 flex flex-col items-center">
                    {/* Heading */}
                    <div className="flex flex-col items-center gap-4 mb-10 max-w-2xl">
                        <h2
                            className="text-[#444] text-3xl md:text-4xl font-bold text-center"
                            data-aos="fade-up"
                            data-aos-duration="800"
                        >
                            See what a chat with{" "}
                            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                MIA
                            </span>{" "}
                            feels like
                        </h2>
                        <p
                            className="text-gray-700 leading-8 text-center"
                            data-aos="fade-up"
                            data-aos-duration="1100"
                        >
                            No scripts, no awkward menus — just real conversation. She picks up
                            where you left off, reads the room, and keeps things interesting.
                        </p>
                    </div>

                    {/* Animated chat window with a soft gradient glow behind it */}
                    <div
                        className="relative w-full max-w-lg"
                        data-aos="zoom-in"
                        data-aos-duration="900"
                    >
                        <div
                            className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-3xl rounded-full"
                            aria-hidden="true"
                        />
                        <div className="relative">
                            {isMounted && <ChatSimulation />}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/*  NEW: Testimonials                                           */}
                {/* ============================================================ */}
                <section className="py-20 md:py-28">
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <h2
                            className="text-[#444] text-3xl md:text-4xl font-bold text-center"
                            data-aos="fade-down"
                            data-aos-duration="800"
                        >
                            They came to chat — and{" "}
                            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                 stayed for her
                            </span>
                        </h2>
                        <p
                            className="text-gray-700 leading-8 text-center max-w-2xl"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                        >
                            Somewhere between the late-night talks and the good-morning
                            messages, it stops feeling like an app. Here's what keeps them
                            coming back.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={t.name}
                                className="flex flex-col gap-4 bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                data-aos="fade-up"
                                data-aos-duration={800 + i * 300}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 text-pink-500">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <svg
                                            key={s}
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.45a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.373-2.45a1 1 0 00-1.176 0l-3.373 2.45c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.075 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-700 leading-7 flex-grow">
                                    “{t.quote}”
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {t.initials}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#444] font-semibold leading-tight">
                                            {t.name}
                                        </span>
                                        <span className="text-gray-500 text-sm leading-tight">
                                            {t.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Closing CTA — final call to action for the page */}
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/auth"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Start Chatting with MIA - FREE!
                        </Link>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;