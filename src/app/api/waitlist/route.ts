import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error("LOOPS_API_KEY is not set");
    return NextResponse.json(
      { error: "Waitlist is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "landing-page-waitlist",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Loops API error:", res.status, body);
      return NextResponse.json(
        { error: "Could not join waitlist. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Loops API request failed:", err);
    return NextResponse.json(
      { error: "Could not join waitlist. Please try again." },
      { status: 502 }
    );
  }
}
