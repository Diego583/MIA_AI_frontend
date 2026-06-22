import { EmailTemplate } from "@/components/templates/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

        const { replyTo, subject, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: "MIA AI Support <support@mia-ai.com>",
            to: "support@mia-ai.com", // Updated email
            replyTo: replyTo,
            subject: `[MIA AI Support] ${subject}`,
            react: EmailTemplate({ subject: subject, message: message }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}
