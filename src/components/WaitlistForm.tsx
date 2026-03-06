"use client";

import { useState, FormEvent } from "react";

type Variant = "pink" | "cyan";

export default function WaitlistForm({ variant = "pink" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const btnClass = variant === "pink" ? "btn-neon-pink" : "btn-neon-cyan";
  const focusRing =
    variant === "pink"
      ? "focus:border-neon-pink focus:shadow-[0_0_20px_rgba(255,45,149,0.3)]"
      : "focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,255,249,0.3)]";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setState("success");
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <p className="text-neon-cyan font-display text-sm font-bold tracking-wide py-3">
        You&apos;re on the list!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`input-neon w-full sm:w-64 ${focusRing}`}
        />
        {state === "error" && (
          <p className="text-red-400 text-xs">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className={`${btnClass} text-sm !py-3 !px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {state === "submitting" ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
