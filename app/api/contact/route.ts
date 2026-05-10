import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderPortfolioContactEmail } from "@/lib/email-template";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

function looksLikeBot(value: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 8 && /^[a-zA-Z0-9]+$/.test(trimmed) && !trimmed.includes(" ");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, company, reason, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    if (looksLikeBot(name) || looksLikeBot(message) || looksLikeBot(company)) {
      return NextResponse.json({ success: true });
    }

    if (name.trim().length < 2 || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid name and message." },
        { status: 400 },
      );
    }

    const emailData = renderPortfolioContactEmail({
      name,
      email,
      company,
      reason,
      message,
    });

    await transporter.sendMail({
      from: `${process.env.EMAIL_FROM_NAME || "Portfolio"} <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: emailData.subject,
      html: emailData.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio contact error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
