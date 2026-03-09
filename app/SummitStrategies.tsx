"use client";
// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";

/* =====================================================
   Summit Strategies — Production-optimised single-file site
===================================================== */

const NAVY = "#0a1f44";
const GOLD = "#f59e0b";

// GoHighLevel / LeadConnector booking widget URL
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/V18dWeU8T1WVYtC2YZmm";

// GoHighLevel / LeadConnector form widget URL
const FORM_URL = "https://api.leadconnectorhq.com/widget/form/NZnmokXvT1kCr3qEvP5W";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Inline icons (no deps) ---------------- */
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const base = {
    className: cn("h-5 w-5", className),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as any;

  switch (name) {
    case "arrow-right":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M5 12h13" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      );
    case "chev-down":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "chev-right":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" />
        </svg>
      );
    case "check":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M12 2l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    case "msg":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      );
    case "cal":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="4" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
        </svg>
      );
    case "target":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M22 12h-2" />
        </svg>
      );
    case "chart":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 17v-6" />
          <path d="M12 17v-10" />
          <path d="M16 17v-4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2c3 3 3 17 0 20" />
          <path d="M12 2c-3 3-3 17 0 20" />
        </svg>
      );
    case "bot":
      return (
        <svg {...base} viewBox="0 0 24 24">
          <path d="M12 2v3" />
          <rect x="4" y="7" width="16" height="14" rx="4" />
          <path d="M8 12h.01" />
          <path d="M16 12h.01" />
          <path d="M9 16h6" />
        </svg>
      );
    default:
      return (
        <svg {...base} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* ---------------- UI primitives ---------------- */
function GoldButton({ className = "", ...rest }: any) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 h-11 font-medium transition",
        "bg-amber-500 text-black hover:bg-amber-400 border border-amber-400/50",
        "focus:outline-none focus:ring-2 focus:ring-amber-400/30",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    />
  );
}

function PlainButton({ className = "", ...rest }: any) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 h-10 font-medium transition",
        "bg-white text-[var(--navy)] border border-[var(--navy)]/25 hover:bg-black/5",
        "focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/15",
        className
      )}
      {...rest}
    />
  );
}

function Card({ className = "", children }: any) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--navy)]/25 bg-white",
        "shadow-[0_10px_30px_rgba(10,31,68,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children }: any) {
  return <div className={cn("p-6 pb-3", className)}>{children}</div>;
}

function CardContent({ className = "", children }: any) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

function Section({ id, className = "", children }: any) {
  return (
    <section id={id} className={cn("bg-white py-10", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/* ---------------- Polished skeleton ---------------- */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--navy)]/15 bg-white",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 40%, ${NAVY} 60%, ${NAVY} 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,31,68,0.00), rgba(10,31,68,0.10), rgba(10,31,68,0.00))",
          transform: "translateX(-50%)",
          animation: "shimmer 1.4s infinite",
        }}
      />
      <style>
        {`@keyframes shimmer { 0% { transform: translateX(-60%);} 100% { transform: translateX(160%);} }`}
      </style>
    </div>
  );
}

/* ---------------- Logo ---------------- */
function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border border-[var(--navy)]/30 bg-white"
      style={{ width: size, height: size }}
      aria-label="Summit Strategies"
      role="img"
    >
      <svg viewBox="0 0 100 60" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 55 L40 9 L74 55 Z" fill={NAVY} />
        <path d="M26 55 L56 20 L96 55 Z" fill="#1d4ed8" opacity="0.95" />
        <path d="M6 55 Q50 48 96 55" stroke={GOLD} strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
}

/* ---------------- Hooks ---------------- */
function useClickOutside(open: boolean, onClose: () => void) {
  const ref = useRef<any>(null);

  useEffect(() => {
    function onDown(e: any) {
      if (!open) return;
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  return ref;
}

function useTyping(text: string, speed = 38, pause = 1200) {
  const [out, setOut] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i += 1;
        setTimeout(tick, speed);
      } else {
        setTimeout(() => {
          i = 0;
          setOut("");
          setTimeout(tick, 300);
        }, pause);
      }
    }

    const blink = setInterval(() => setCursor((c) => !c), 520);
    tick();

    return () => {
      cancelled = true;
      clearInterval(blink);
    };
  }, [text, speed, pause]);

  return { out, cursor };
}

/* ---------------- “Real-life style” construction worker (SVG, no network) ---------------- */
function WorkerHelmetPhoto({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 440"
      className={cn("w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Smiling construction worker with helmet"
    >
      <defs>
        <linearGradient id="w_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef3ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="w_sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfe3ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <rect
        x="16"
        y="16"
        width="688"
        height="408"
        rx="28"
        fill="url(#w_bg)"
        stroke={NAVY}
        strokeOpacity="0.18"
      />
      <rect x="56" y="56" width="608" height="328" rx="26" fill="url(#w_sky)" />

      <path
        d="M90 330 C180 310 260 340 350 320 C450 295 520 340 630 315"
        stroke={NAVY}
        strokeOpacity="0.18"
        strokeWidth="8"
        fill="none"
      />

      <g transform="translate(235,70)">
        <path
          d="M30 270 C80 220 170 220 220 270"
          fill={NAVY}
          fillOpacity="0.10"
          stroke={NAVY}
          strokeOpacity="0.18"
          strokeWidth="3"
        />
        <path d="M60 270 C100 235 150 235 190 270" fill={NAVY} fillOpacity="0.14" />

        <rect x="112" y="185" width="30" height="28" rx="12" fill={NAVY} fillOpacity="0.18" />

        <ellipse cx="127" cy="145" rx="62" ry="70" fill={NAVY} fillOpacity="0.16" />
        <ellipse cx="127" cy="148" rx="56" ry="64" fill="#ffffff" opacity="0.70" />

        <path
          d="M70 110 C78 70 105 48 127 48 C150 48 176 70 184 110"
          fill={GOLD}
          opacity="0.95"
          stroke="#c97d00"
          strokeWidth="3"
        />
        <path d="M58 110 H196" stroke="#c97d00" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M127 52 V110"
          stroke="#c97d00"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.8"
        />

        <circle cx="106" cy="145" r="5" fill={NAVY} opacity="0.7" />
        <circle cx="148" cy="145" r="5" fill={NAVY} opacity="0.7" />

        <path
          d="M105 168 C118 184 136 184 149 168"
          stroke={NAVY}
          strokeOpacity="0.6"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M55 278 L85 210 H169 L200 278 Z"
          fill={NAVY}
          fillOpacity="0.10"
          stroke={NAVY}
          strokeOpacity="0.18"
          strokeWidth="3"
        />
        <path
          d="M87 210 L127 246 L167 210"
          stroke={GOLD}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M106 210 V278"
          stroke={GOLD}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M148 210 V278"
          stroke={GOLD}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      <path d="M90 105 Q320 45 630 120" stroke={GOLD} strokeWidth="6" fill="none" opacity="0.8" />
    </svg>
  );
}

function TradiePhoto({ className = "" }: { className?: string }) {
  return <WorkerHelmetPhoto className={className} />;
}

/* ---------------- Services data ---------------- */
const SERVICES: Array<{ key: string; children?: string[] }> = [
  { key: "Paid Ads", children: ["Instagram", "Facebook", "Google"] },
  {
    key: "AI Agents",
    children: [
      "AI Receptionist",
      "SMS Appointment Agent",
      "Social Media Manager",
      "Whatsapp AI Booking & Follow Up Agent",
      "Outbound WhatsApp Message Agent",
      "Website Chatbot Agent",
    ],
  },
  { key: "CRM Tracking" },
  { key: "SEO" },
];

type ServiceCopy = {
  title: string;
  subtitle: string;
  pitch: string;
  features: Array<{ icon: string; title: string; desc: string }>;
  outcomes: string[];
  stepsTitle: string;
  steps: string[];
};

function getServiceCopy(key: string): ServiceCopy {
  // NOTE: The previous syntax error came from a malformed object literal here:
  // there were stray `{ icon: ... }` entries not wrapped in a service key.
  // This map is now a valid Record<string, ServiceCopy>.
  const base: Record<string, ServiceCopy> = {
    Instagram: {
      title: "Instagram Ads",
      subtitle: "Reach buyers fast with high-performing creative.",
      pitch:
        "Instagram is where attention lives. We use scroll-stopping creative and tight targeting to generate enquiries from people ready to speak, then our systems follow up instantly so you win the booking.",
      features: [
        { icon: "target", title: "Targeting", desc: "Suburbs, service radius, and buyer intent signals." },
        { icon: "chart", title: "Creative testing", desc: "We test multiple ads to find what converts best." },
        { icon: "bot", title: "Instant follow-up", desc: "Speed-to-lead automation to protect your conversions." },
      ],
      outcomes: ["Consistent enquiries", "Better conversion rates", "Scalable growth"],
      stepsTitle: "Process",
      steps: ["Offer + angle selection", "Creative production", "Launch + test", "Optimise + scale"],
    },

    Facebook: {
      title: "Facebook Ads",
      subtitle: "Reliable enquiries from your community.",
      pitch:
        "Facebook works because trust matters. We run proof-led campaigns that turn credibility (reviews, results, before/after) into enquiries — then into booked calls.",
      features: [
        { icon: "shield", title: "Trust-building", desc: "Reviews and proof angles that increase conversions." },
        { icon: "target", title: "Smart targeting", desc: "Audiences + behaviours to find real buyers." },
        { icon: "cal", title: "Booking flow", desc: "Send leads straight into booking with reminders." },
      ],
      outcomes: ["Higher quality leads", "More quotes booked", "Lower wasted spend"],
      stepsTitle: "Process",
      steps: ["Offer + proof stack", "Campaign build", "Test + refine", "Scale what works"],
    },

    Google: {
      title: "Google Ads",
      subtitle: "Capture demand from people searching right now.",
      pitch:
        "Google ads are intent-driven: people are already looking for your service. We structure campaigns to capture that demand and convert it with fast follow-up.",
      features: [
        { icon: "globe", title: "High-intent keywords", desc: "Focus on searches that indicate buying intent." },
        { icon: "chart", title: "Landing + tracking", desc: "Conversion-first pages with proper tracking." },
        { icon: "shield", title: "Budget efficiency", desc: "Negative keywords + optimisation to cut waste." },
      ],
      outcomes: ["More inbound calls", "Higher intent enquiries", "Better ROI"],
      stepsTitle: "Process",
      steps: ["Keyword + competitor research", "Campaign structure", "Conversion tracking", "Optimise + expand"],
    },

    "AI Receptionist": {
      title: "AI Receptionist",
      subtitle: "Never miss a call again.",
      pitch:
        "If you miss a call or delay follow-up, you often lose the lead. The AI receptionist answers inbound calls instantly, places outbound follow-up calls automatically, asks the right qualification questions by voice, and books qualified enquiries directly into your calendar.",
      features: [
        { icon: "msg", title: "24/7 responses", desc: "Every message gets an immediate reply." },
        { icon: "shield", title: "Filters tyre-kickers", desc: "Only serious prospects get through to booking." },
        { icon: "cal", title: "Booked times", desc: "Auto-confirmation + reminders reduce no-shows." },
      ],
      outcomes: ["More qualified quotes", "Faster response times", "Less admin"],
      stepsTitle: "Flow",
      steps: ["Enquiry received", "Qualify with 3–5 questions", "Offer times", "Confirm + remind"],
    },

    "SMS Appointment Agent": {
      title: "SMS Appointment Agent",
      subtitle: "Answer inbound SMS enquiries, qualify clients, and turn conversations into booked qualified quotes.",
      pitch:
        "SMS enquiries are opportunities. This agent responds instantly to incoming messages, asks structured qualification questions, and books serious prospects in as confirmed, qualified quotes — even while you’re on-site.",
      features: [
        { icon: "msg", title: "Instant text-back", desc: "Auto replies the moment a call is missed." },
        { icon: "shield", title: "Qualification", desc: "Confirms details before offering times." },
        { icon: "cal", title: "Auto booking", desc: "Books into your calendar and sends reminders." },
      ],
      outcomes: ["More recovered leads", "Less phone tag", "Higher close rate"],
      stepsTitle: "Flow",
      steps: ["Inbound SMS received", "SMS reply", "Qualify", "Book"],
    },

    "Social Media Manager": {
      title: "Social Media Management",
      subtitle: "Consistent content without it taking over your week.",
      pitch:
        "Most businesses do not post because it is time-consuming. We run a simple system for consistent content that builds trust and supports your ads.",
      features: [
        { icon: "chart", title: "Content cadence", desc: "Plan and publish consistently." },
        { icon: "shield", title: "Brand consistency", desc: "Clear messaging that increases trust." },
        { icon: "target", title: "Leads support", desc: "Content that improves conversion rates." },
      ],
      outcomes: ["More trust", "Better ad performance", "More enquiries"],
      stepsTitle: "Process",
      steps: ["Content plan", "Create assets", "Post + engage", "Report"],
    },

    "Whatsapp AI Booking & Follow Up Agent": {
      title: "WhatsApp AI Call Agent",
      subtitle: "Handle WhatsApp voice calls and turn them into booked qualified quotes.",
      pitch:
        "If your business receives WhatsApp calls, speed and professionalism matter. This AI call agent answers inbound WhatsApp voice calls, qualifies the client over the call, and books serious prospects directly into your calendar automatically.",
      features: [
        {
          icon: "shield",
          title: "Inbound Call Answering",
          desc: "Answers WhatsApp voice calls instantly — even after hours.",
        },
        {
          icon: "target",
          title: "Voice Qualification",
          desc: "Asks structured questions during the call to filter serious buyers.",
        },
        {
          icon: "cal",
          title: "Direct Booking",
          desc: "Books qualified callers straight into your calendar.",
        },
      ],
      outcomes: ["More booked WhatsApp calls", "Higher quality enquiries", "Less manual follow-up"],
      stepsTitle: "Call Flow",
      steps: ["WhatsApp call received", "Qualify over voice", "Offer times", "Confirm booking"],
    },

    "Outbound WhatsApp Message Agent": {
      title: "Outbound WhatsApp Message Agent",
      subtitle: "Handle form enquiries and book qualified quotes automatically.",
      pitch:
        "Most businesses have a hidden goldmine: past enquiries that never booked. Outbound WhatsApp Message Agent re-engages them with a clear offer and easy booking.",
      features: [
        { icon: "msg", title: "Instant WhatsApp reply", desc: "Replies the moment a form is submitted or an enquiry comes in." },
        { icon: "shield", title: "Qualification", desc: "Asks the right questions to filter out time-wasters before booking." },
        { icon: "cal", title: "Auto booking", desc: "Books qualified prospects directly into your calendar with confirmations and reminders." },
      ],
      outcomes: ["More qualified quotes", "Faster response times", "Less admin"],
      stepsTitle: "Message Flow",
      steps: ["Form/enquiry received", "Instant WhatsApp message", "Qualify", "Book + remind"],
    },

    "Website Chatbot Agent": {
      title: "Website Chatbot Agent",
      subtitle: "Convert website traffic into qualified bookings.",
      pitch:
        "A chatbot turns anonymous visitors into leads by answering questions, qualifying them and booking calls — without waiting for office hours.",
      features: [
        { icon: "msg", title: "Instant answers", desc: "Handles FAQs and objections immediately." },
        { icon: "shield", title: "Qualification", desc: "Ask the right questions before booking." },
        { icon: "cal", title: "Booking", desc: "Books directly into your schedule." },
      ],
      outcomes: ["More booked chats", "Less manual follow-up", "Higher conversion"],
      stepsTitle: "Flow",
      steps: ["Chat starts", "Qualify", "Offer times", "Confirm"],
    },

    "CRM Tracking": {
      title: "The CRM System",
      subtitle: "Track everything in one place.",
      pitch:
        "We partner with GoHighLevel to give you a CRM that tracks every lead, every source, every follow-up and every outcome. You get full access — with automation already set up so nothing slips through.",
      features: [
        { icon: "chart", title: "Full visibility", desc: "See where every lead came from and what happened next." },
        { icon: "bot", title: "Automation", desc: "Instant follow-up sequences so you do not lose leads." },
        { icon: "shield", title: "Full access", desc: "View every message, stage and result any time." },
      ],
      outcomes: ["More booked clients", "Less manual admin", "Clear reporting"],
      stepsTitle: "Setup",
      steps: ["Connect lead sources", "Build pipeline stages", "Add automation", "Track results"],
    },

    SEO: {
      title: "SEO",
      subtitle: "Build long-term organic enquiries without paying per click.",
      pitch:
        "SEO is your compounding asset. We improve your visibility for searches in your area so you get consistent inbound enquiries month after month.",
      features: [
        { icon: "globe", title: "Search visibility", desc: "Rank for service searches." },
        { icon: "chart", title: "Content + pages", desc: "Create pages that convert and rank." },
        { icon: "shield", title: "Technical fixes", desc: "Improve speed, structure and crawlability." },
      ],
      outcomes: ["More inbound calls", "Lower cost per lead long-term", "Stronger brand trust"],
      stepsTitle: "Process",
      steps: ["Audit + plan", "On-page fixes", "Content", "Track + iterate"],
    },
  };

  return base[key] || base["Instagram"];
}

/* ---------------- Services dropdown ---------------- */
function ServicesMenu({
  open,
  onClose,
  onPick,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (key: string) => void;
  onBook: () => void;
}) {
  const ref = useClickOutside(open, onClose);
  const [active, setActive] = useState<string>("Paid Ads");

  useEffect(() => {
    if (open) setActive("Paid Ads");
  }, [open]);

  const activeItem = SERVICES.find((s) => s.key === active);
  const hasCategories = !!activeItem?.children?.length;
  const showRight = hasCategories;

  if (!open) return null;

  const iconFor = (k: string) =>
    k === "Paid Ads" ? "target" : k === "AI Agents" ? "bot" : k === "CRM Tracking" ? "chart" : "globe";

  const descFor = (k: string) => {
    if (k === "Paid Ads") return "Instagram, Facebook & Google — bring in high-intent enquiries.";
    if (k === "AI Agents") return "Inbound/outbound handling + qualification + booking — 24/7.";
    if (k === "CRM Tracking") return "Track every lead, every stage, every outcome — with full access.";
    return "Rank for high-intent searches and build consistent organic enquiries.";
  };

  const categoryMeta: Record<string, { title: string; desc: string; icon: string }> = {
    Instagram: { title: "Instagram Ads", desc: "Fast reach with scroll-stopping creative.", icon: "target" },
    Facebook: { title: "Facebook Ads", desc: "Trust-led campaigns for service businesses.", icon: "shield" },
    Google: { title: "Google Ads", desc: "Capture demand from people searching now.", icon: "globe" },

    "AI Receptionist": {
      title: "AI Receptionist",
      desc: "Inbound & outbound AI call agent that answers, qualifies and books automatically.",
      icon: "bot",
    },
    "SMS Appointment Agent": {
      title: "SMS Appointment Agent",
      desc: "Answer SMS enquiries, qualify them, and book them in as qualified quotes.",
      icon: "msg",
    },
    "Social Media Manager": {
      title: "Social Media Manager",
      desc: "Consistent posting that builds trust and supports ads.",
      icon: "chart",
    },
    "Whatsapp AI Booking & Follow Up Agent": {
      title: "WhatsApp AI Call Agent",
      desc: "Answers WhatsApp voice calls, qualifies, and books into your calendar.",
      icon: "shield",
    },
    "Outbound WhatsApp Message Agent": {
      title: "Outbound WhatsApp Message Agent",
      desc: "Turns form submissions/enquiries into qualified booked quotes automatically.",
      icon: "target",
    },
    "Website Chatbot Agent": {
      title: "Website Chatbot Agent",
      desc: "Turn website visitors into qualified bookings.",
      icon: "bot",
    },
  };

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] z-50",
        "w-[980px] max-w-[calc(100vw-24px)]",
        "rounded-2xl border border-[var(--navy)]/20 bg-white",
        "shadow-[0_24px_70px_rgba(10,31,68,0.18)]",
        "overflow-hidden"
      )}
      role="menu"
      aria-label="Services menu"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[var(--navy)]/10">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[var(--navy)]/60">SERVICES</p>
          
        </div>
        <PlainButton onClick={onClose} className="h-9 px-3">
          Close
        </PlainButton>
      </div>

      <div className={cn("grid gap-4 p-4", showRight ? "lg:grid-cols-[320px_1fr]" : "lg:grid-cols-1")}>
        <div className="rounded-2xl border border-[var(--navy)]/15 bg-white p-4">
          <p className="px-2 pb-3 text-xs font-semibold text-[var(--navy)]/60">MAIN SERVICES</p>

          <div className="grid gap-1">
            {SERVICES.map((s) => {
              const isActive = s.key === active;
              const hasChildren = !!s.children?.length;

              return (
                <button
                  key={s.key}
                  onMouseEnter={() => setActive(s.key)}
                  onFocus={() => setActive(s.key)}
                  onClick={() => {
                    // CRM Tracking + SEO have no subcategories and open their own pages.
                    if (!hasChildren) onPick(s.key);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive ? "bg-[var(--navy)] text-white" : "bg-white text-[var(--navy)] hover:bg-black/5",
                    isActive ? "border border-[var(--navy)]" : "border border-transparent hover:border-[var(--navy)]/15"
                  )}
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-lg",
                        isActive ? "bg-white/10" : "bg-[var(--navy)]/5"
                      )}
                    >
                      <Icon
                        name={iconFor(s.key)}
                        className={cn("h-4 w-4", isActive ? "text-white" : "text-[var(--navy)]")}
                      />
                    </span>
                    <span>{s.key}</span>
                  </span>

                  {hasChildren ? (
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-lg",
                        isActive ? "bg-white/10" : "bg-[var(--navy)]"
                      )}
                    >
                      <Icon name="chev-right" className="h-4 w-4 text-white" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--navy)]/15 bg-white p-4">
            <p className="text-sm font-semibold text-[var(--navy)]">Need help choosing?</p>
            <p className="mt-1 text-sm text-[var(--navy)]/70">Book a demo and we’ll map the fastest path to booked quotes.</p>
            <GoldButton
              onClick={() => {
                onClose();
                onBook();
              }}
              className="mt-3 w-full"
            >
              Book demo call
              <Icon name="arrow-right" className="h-4 w-4" />
            </GoldButton>
          </div>
        </div>

        {showRight ? (
          <div className="rounded-2xl border border-[var(--navy)]/15 bg-white p-5 min-h-[420px]">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--navy)]/60">PREVIEW</p>
              <p className="mt-1 text-lg font-semibold text-[var(--navy)] truncate">{active}</p>
              <p className="mt-1 text-sm text-[var(--navy)]/70">{descFor(active)}</p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-[var(--navy)]/60">CATEGORIES</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(activeItem?.children || []).map((c) => {
                  const meta = categoryMeta[c] || { title: c, desc: "View details", icon: "chev-right" };
                  return (
                    <button
                      key={c}
                      onClick={() => onPick(c)}
                      className={cn(
                        "group rounded-2xl border border-[var(--navy)]/15 bg-white p-4 text-left transition",
                        "hover:bg-black/5 hover:border-[var(--navy)]/25"
                      )}
                      role="menuitem"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--navy)] text-white">
                          <Icon name={meta.icon} className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--navy)] truncate">{meta.title}</p>
                          <p className="mt-1 text-sm text-[var(--navy)]/70 line-clamp-2">{meta.desc}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--navy)]/60">Open page</span>
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--navy)]">
                          <Icon name="chev-right" className="h-4 w-4 text-white" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Testimonials ---------------- */
function TestimonialSlider() {
  const testimonials = useMemo(
    () => [
      {
        name: "Soodie_Fades — Ryan",
        quote:
          "Since working with Harsh, our bookings have grown consistently through paid ads and proper social media management. We’re now attracting the right clients, filling more appointment slots each week, and building a stronger brand presence online without me having to manage everything myself. It’s helped turn the shop into a much more predictable and scalable business.",
      },
      {
        name: "useflow.ai — Shaan",
        quote:
          "Working with Harsh to manage our paid ads and CRM systems significantly improved the consistency and quality of leads coming through. Campaign performance became far more predictable, our pipeline tracking improved, and follow-ups became automated instead of manual. This allowed our team to focus on closing deals and servicing clients while the system kept opportunities flowing in reliably.",
      },
    ],
    []
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5200);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const item = testimonials[i];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <p className="text-sm font-semibold text-[var(--navy)]">Client feedback</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="relative rounded-2xl border border-[var(--navy)]/30 bg-[var(--navy)] p-7 flex flex-1 flex-col justify-between min-h-[340px] text-white">
          <div>
            <p className="text-xl sm:text-2xl leading-relaxed text-white/95">“{item.quote}”</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-base font-semibold text-white">{item.name}</p>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={cn("h-2.5 w-2.5 rounded-full transition-all", idx === i ? "bg-white" : "bg-white/40")}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Home page ---------------- */
function HomePage({ onBook, openServices }: any) {
  const typing = useTyping("Transform your business with AI Marketing", 40, 1400);

  const coreServices = useMemo(
    () => ["Paid ads: Instagram Google and Facebook", "AI Agents", "Social Media Management", "CRM Tracking", "SEO"],
    []
  );

  return (
    <>
      <Section id="home" className="pt-10 pb-6">
        <div className="grid gap-10 lg:grid-cols-1">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--navy)] sm:text-5xl">Climb higher with us</h1>
            <div className="mt-4 text-lg text-[var(--navy)]/80">
              <span className="font-medium">{typing.out}</span>
              <span className={cn("ml-1", typing.cursor ? "opacity-100" : "opacity-0")}>|</span>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <p className="text-sm font-semibold text-[var(--navy)]">Our core services</p>
                <p className="text-sm text-[var(--navy)]/70">High-quality enquiries + AI automation to book more quotes.</p>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {coreServices.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-md bg-[var(--navy)] text-white">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-[var(--navy)]">{s}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <GoldButton onClick={onBook}>
                    Book demo call
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </GoldButton>
                  <PlainButton onClick={openServices}>
                    View services
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </PlainButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="testimonials" className="pt-0 pb-6">
        <div className="mb-4">
          <p className="text-xs font-semibold text-[var(--navy)]/70">TESTIMONIALS</p>
          <h2 className="mt-1 text-3xl font-semibold text-[var(--navy)]">Testimonials</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="h-full">
            <TestimonialSlider />
          </div>

          <Card className="h-full">
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-[var(--navy)]/15 ring-1 ring-[var(--navy)]/10">
                <TradiePhoto className="h-[280px] w-full" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--navy)]/80">
                Construction and trade businesses benefit strongly from our systems because demand is constant. We bring in high-intent enquiries and
                automate fast follow-up so more prospects turn into confirmed quotes and paying jobs — with less time wasted chasing leads.
              </p>

              <GoldButton onClick={onBook} className="mt-5">
                Book demo call
                <Icon name="arrow-right" className="h-4 w-4" />
              </GoldButton>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="ai-receptionist" className="pt-0 pb-6">
        <div className="mb-4">
          <p className="text-xs font-semibold text-[var(--navy)]/70">FEATURED</p>
          <h2 className="mt-1 text-3xl font-semibold text-[var(--navy)]">Try the AI Receptionist</h2>
          <p className="mt-2 text-sm text-[var(--navy)]/70">Inbound & outbound AI call handling — qualification and booking, even after hours.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <Card className="h-full">
            <CardHeader>
              <p className="text-xs font-semibold text-[var(--navy)]/70">FEATURED SERVICE</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--navy)]">AI Receptionist</p>
              <p className="text-sm text-[var(--navy)]/70">Inbound & outbound AI call handling — qualification and booking, even after hours.</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--navy)]/80">
                If someone calls after hours and you miss it — you often lose them. Our AI receptionist answers inbound calls instantly, makes outbound
                follow-up calls within seconds, qualifies the enquiry by voice, and books them directly into your calendar automatically.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  {
                    icon: "msg",
                    title: "Inbound + outbound calls",
                    text: "Answers inbound calls and places outbound follow-up calls in seconds — 24/7.",
                  },
                  { icon: "shield", title: "Qualification", text: "Filters time-wasters before booking." },
                  { icon: "cal", title: "Auto booking", text: "Confirms a time and sends reminders." },
                ].map((x) => (
                  <div key={x.title} className="rounded-2xl border border-[var(--navy)]/15 bg-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--navy)] text-white">
                        <Icon name={x.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--navy)]">{x.title}</p>
                        <p className="mt-1 text-sm text-[var(--navy)]/70">{x.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <GoldButton onClick={onBook} className="mt-6">
                Book demo call
                <Icon name="arrow-right" className="h-4 w-4" />
              </GoldButton>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <p className="text-sm font-semibold text-[var(--navy)]">How it works</p>
              <p className="text-sm text-[var(--navy)]/70">A simple flow that increases conversions.</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  "Lead enquiry comes in",
                  "AI asks 3–5 qualifying questions",
                  "Only qualified leads get booking times",
                  "Booking confirmed + reminders",
                ].map((step, idx) => (
                  <div key={step} className="rounded-2xl border border-[var(--navy)]/15 bg-white p-4">
                    <p className="text-sm text-[var(--navy)]/85">
                      <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--navy)] text-white font-semibold">
                        {idx + 1}
                      </span>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--navy)]/15 bg-white p-4">
                <p className="text-sm font-semibold text-[var(--navy)]">Why it converts</p>
                <p className="mt-1 text-sm text-[var(--navy)]/70">
                  Speed wins. Most leads go cold within minutes — this system replies instantly, filters the right people, and books them in before they
                  contact your competitor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="grow-audience" className="pt-0 pb-6">
        <div className="mb-4">
          <p className="text-xs font-semibold text-[var(--navy)]/70">FEATURED</p>
          <h2 className="mt-1 text-3xl font-semibold text-[var(--navy)]">Grow your Audience</h2>
          <p className="mt-2 text-sm text-[var(--navy)]/70">
            Paid ads that bring in high-intent enquiries — then our systems follow up fast so more of them turn into booked quotes.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: "target", title: "Target buyers", desc: "Reach the right people in the right suburbs — not random clicks." },
                { icon: "chart", title: "Test + scale", desc: "We test creatives and angles, then scale what consistently converts." },
                { icon: "shield", title: "Quality control", desc: "Better questions and follow-up so you avoid time-wasters." },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-[var(--navy)]/15 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--navy)] text-white">
                      <Icon name={x.icon} className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-[var(--navy)]">{x.title}</p>
                  </div>
                  <p className="mt-3 text-sm text-[var(--navy)]/70">{x.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[var(--navy)] text-white p-4">
              <p className="text-sm font-semibold">Outcome</p>
              <p className="mt-1 text-sm text-white/85">
                More qualified enquiries, more booked quotes, and less time chasing. Ads bring the demand — our follow-up systems help you win it.
              </p>
            </div>

            <GoldButton onClick={onBook} className="mt-6">
              Book demo call
              <Icon name="arrow-right" className="h-4 w-4" />
            </GoldButton>
          </CardContent>
        </Card>
      </Section>

      <Section id="book" className="pt-0 pb-8">
        <div className="mb-4">
          <p className="text-xs font-semibold text-[var(--navy)]/70">BOOKING</p>
          <h2 className="mt-1 text-3xl font-semibold text-[var(--navy)]">Book a demo call</h2>
          <p className="mt-2 text-sm text-[var(--navy)]/70">Pick a date and time below.</p>
        </div>

        <BookingCalendar />
      </Section>
    </>
  );
}

/* ---------------- Booking calendar (production polish) ---------------- */
function BookingCalendar() {
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);

  // Best-effort: some GHL widgets postMessage on completion.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const origin = String((e as any).origin || "");
      const okOrigin =
        origin.includes("leadconnectorhq.com") ||
        origin.includes("msgsndr.com") ||
        origin.includes("link.msgsndr.com");
      if (!okOrigin) return;

      const data: any = (e as any).data;
      const blob =
        typeof data === "string" ? data.toLowerCase() : JSON.stringify(data || {}).toLowerCase();

      // Heuristic: treat these as a successful booking signal
      if (
        blob.includes("appointment") &&
        (blob.includes("confirmed") || blob.includes("booked") || blob.includes("scheduled"))
      ) {
        setBooked(true);
        // Scroll to the confirmation banner for a clear post-booking moment
        setTimeout(() => {
          const banner = document.getElementById("booked-confirmation");
          (banner || document.getElementById("book"))?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-semibold text-[var(--navy)]">Book your demo call</p>
        <p className="text-sm text-[var(--navy)]/70">Pick a date and time below to schedule your call.</p>
      </CardHeader>
      <CardContent>
        {booked ? (
          <div
            id="booked-confirmation"
            className="mb-4 rounded-2xl border border-amber-400/40 bg-amber-50 p-4 text-[var(--navy)]"
          >
            <p className="text-sm font-semibold">Booked — you’re all set.</p>
            <p className="mt-1 text-sm text-[var(--navy)]/75">
              You should receive a confirmation shortly. If not, check spam/junk.
            </p>
          </div>
        ) : null}

        <div className="relative rounded-2xl border border-[var(--navy)]/15 bg-white overflow-hidden">
          {!loaded ? <Skeleton className="h-[720px]" /> : null}
          <iframe
            src={BOOKING_URL}
            style={{ width: "100%", height: "720px", border: 0, opacity: loaded ? 1 : 0 }}
            scrolling="no"
            title="Summit Strategies Booking"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- GHL contact form embed (production polish) ---------------- */
function GHLContactEmbed() {
  const [loaded, setLoaded] = useState(false);

  // Keep the official embed script for responsive sizing/behaviour.
  useEffect(() => {
    const existing = document.getElementById("ghl-form-embed-script");
    if (existing) return;
    const s = document.createElement("script");
    s.id = "ghl-form-embed-script";
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="relative rounded-2xl border border-[var(--navy)]/15 bg-white overflow-hidden">
      {!loaded ? <Skeleton className="h-[600px]" /> : null}
      <iframe
        src={FORM_URL}
        style={{ width: "100%", height: "600px", border: "none", borderRadius: "12px", opacity: loaded ? 1 : 0 }}
        id="inline-NZnmokXvT1kCr3qEvP5W"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Website Contact Form"
        data-height="591"
        data-layout-iframe-id="inline-NZnmokXvT1kCr3qEvP5W"
        data-form-id="NZnmokXvT1kCr3qEvP5W"
        title="Website Contact Form"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ---------------- Service detail pages (category pages) ---------------- */
function ServiceDetailPage({ serviceKey, onBook }: { serviceKey: string; onBook: () => void }) {
  const copy = getServiceCopy(serviceKey);

  const componentsByKey: Record<string, Array<{ icon: string; title: string; desc: string }>> = {
    Instagram: [
      { icon: "target", title: "Offer + Angle", desc: "We position your service with a clear outcome and a strong reason to enquire now." },
      { icon: "chart", title: "Creative Testing", desc: "Multiple creatives are tested to find the message that converts best." },
      { icon: "bot", title: "Instant Follow-up", desc: "Every lead is followed up fast to protect conversion before they go cold." },
    ],
    Facebook: [
      { icon: "shield", title: "Proof Stack", desc: "Reviews, results and job photos are built into ads to increase trust." },
      { icon: "target", title: "Audience Targeting", desc: "We target likely buyers and exclude low-intent traffic where possible." },
      { icon: "cal", title: "Booking Flow", desc: "Enquiries are pushed into a clean booking flow to turn interest into action." },
    ],
    Google: [
      { icon: "globe", title: "High-Intent Keywords", desc: "We focus on searches that signal buying intent, not generic browsing." },
      { icon: "chart", title: "Conversion Tracking", desc: "Tracking is set up so we know exactly what produces calls and enquiries." },
      { icon: "shield", title: "Waste Reduction", desc: "Negative keywords and optimisation reduce spend on irrelevant clicks." },
    ],
    "AI Receptionist": [
      { icon: "msg", title: "Instant Replies", desc: "Answers inbound calls immediately and follows up outbound within seconds so leads don’t drift to competitors." },
      { icon: "shield", title: "Qualification Questions", desc: "Asks key questions to filter out time-wasters." },
      { icon: "cal", title: "Booking + Reminders", desc: "Books the right people and reduces no-shows with reminders." },
    ],
    "SMS Appointment Agent": [
      { icon: "msg", title: "Inbound SMS Handling", desc: "Responds instantly to client text enquiries with structured qualification questions." },
      { icon: "shield", title: "Quick Qualification", desc: "Confirms job type before offering times." },
      { icon: "cal", title: "Schedule Lock-In", desc: "Books appointments and confirms instantly." },
    ],
    "Social Media Manager": [
      { icon: "chart", title: "Consistent Posting", desc: "A simple posting system that keeps your brand visible." },
      { icon: "shield", title: "Brand Clarity", desc: "Clear messaging that builds trust before people enquire." },
      { icon: "target", title: "Conversion Support", desc: "Content that makes paid ads and enquiries convert better." },
    ],
    "Whatsapp AI Booking & Follow Up Agent": [
      { icon: "shield", title: "WhatsApp Call Handling", desc: "Answers inbound WhatsApp voice calls automatically." },
      { icon: "target", title: "Live Qualification", desc: "Qualifies callers during the conversation before offering times." },
      { icon: "cal", title: "Calendar Booking", desc: "Books qualified callers directly into your schedule." },
    ],
    "Outbound WhatsApp Message Agent": [
      { icon: "msg", title: "Instant Enquiry Response", desc: "Responds via WhatsApp the moment a form is submitted or an enquiry arrives." },
      { icon: "shield", title: "Qualification Questions", desc: "Collects the details you need to confirm they’re a serious buyer." },
      { icon: "cal", title: "Booked Quotes", desc: "Books qualified prospects into your calendar with confirmations and reminders." }
    ],
    "Website Chatbot Agent": [
      { icon: "msg", title: "FAQ + Objection Handling", desc: "Answers questions instantly to prevent drop-offs." },
      { icon: "shield", title: "Lead Qualification", desc: "Collects key info to ensure you speak to the right people." },
      { icon: "cal", title: "Booking", desc: "Converts traffic into booked calls without waiting for office hours." },
    ],
    "CRM Tracking": [
      { icon: "chart", title: "Full Pipeline Visibility", desc: "See every lead, every stage, and what happened next." },
      { icon: "bot", title: "Automated Follow-up", desc: "Sequences run automatically so no enquiry is left behind." },
      { icon: "shield", title: "Full Access", desc: "You get complete access to messages, stages, and reporting." },
    ],
    SEO: [
      { icon: "globe", title: "Search Visibility", desc: "Improve rankings for high-intent service searches." },
      { icon: "chart", title: "Content + Pages", desc: "Build pages that rank and convert into enquiries." },
      { icon: "shield", title: "Technical SEO", desc: "Speed, structure and indexing improvements that support ranking." },
    ],
  };

  const components = componentsByKey[serviceKey] || copy.features || [];

  return (
    <Section id="service-detail" className="pt-10 pb-10">
      <div className="mx-auto max-w-6xl">
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold text-[var(--navy)]/60 text-center">SERVICE</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--navy)] text-center">{copy.title}</h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--navy)]/75 max-w-3xl mx-auto text-center leading-relaxed">
              {copy.pitch} This category is built to create reliable growth by removing the biggest bottlenecks that stop businesses from scaling:
              inconsistent enquiry flow, slow response times, and manual follow-up.
            </p>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div className="rounded-2xl border border-[var(--navy)]/15 bg-white p-6">
                <p className="text-sm font-semibold text-[var(--navy)]">Components & services included</p>
                <p className="mt-1 text-sm text-[var(--navy)]/65">What you get inside this category.</p>

                <div className="mt-4 grid gap-3">
                  {components.map((f: any) => (
                    <div key={f.title} className="rounded-xl border border-[var(--navy)]/15 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--navy)] text-white">
                          <Icon name={f.icon} className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--navy)]">{f.title}</p>
                          <p className="mt-1 text-sm text-[var(--navy)]/70 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--navy)]/15 bg-white p-6">
                <p className="text-sm font-semibold text-[var(--navy)]">Process</p>
                <p className="mt-1 text-sm text-[var(--navy)]/65">How we deliver this from start to finish.</p>

                <div className="mt-4 grid gap-3">
                  {copy.steps.map((s, idx) => (
                    <div key={s} className="rounded-xl border border-[var(--navy)]/15 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--navy)] text-white font-semibold">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-[var(--navy)]/80">{s}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[var(--navy)]/15 bg-white p-5">
                  <p className="text-sm font-semibold text-[var(--navy)]">Outcome</p>
                  <ul className="mt-3 grid gap-2">
                    {copy.outcomes.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-[var(--navy)]/75">
                        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md bg-[var(--navy)] text-white">
                          <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex justify-center">
                  <GoldButton onClick={onBook} className="px-8">
                    Work with us
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </GoldButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

/* ---------------- Minimal self-tests (no framework) ----------------
   Run by setting: window.__RUN_TESTS__ = true in dev tools.
   These are intentionally lightweight and won't affect production.
--------------------------------------------------------------- */
function runSelfTests() {
  try {
    console.assert(typeof cn("a", false, "b") === "string", "cn should return a string");
    console.assert(cn("a", false, "b") === "a b", "cn should join truthy classes");

    const x = getServiceCopy("Instagram");
    console.assert(!!x && x.title.includes("Instagram"), "getServiceCopy should return Instagram copy");

    const fallback = getServiceCopy("__unknown__");
    console.assert(!!fallback && fallback.title, "getServiceCopy should fallback safely");

    console.assert(Array.isArray(SERVICES) && SERVICES.length > 0, "SERVICES should exist");

    // Ensure every submenu child key exists in getServiceCopy
    const childKeys = SERVICES.flatMap((s) => s.children || []);
    childKeys.forEach((k) => {
      const c = getServiceCopy(k);
      console.assert(!!c && typeof c.title === "string", `Missing ServiceCopy for: ${k}`);
    });

    // Ensure top-level services without children exist in getServiceCopy
    SERVICES.filter((s) => !(s.children || []).length).forEach((s) => {
      const c = getServiceCopy(s.key);
      console.assert(!!c && typeof c.title === "string", `Missing ServiceCopy for: ${s.key}`);
    });

    console.info("✅ SummitStrategiesSite self-tests passed");
  } catch (e) {
    console.error("❌ SummitStrategiesSite self-tests failed", e);
  }
}

/* ---------------- App shell ---------------- */
export default function SummitStrategiesSite() {
  const rootStyle = { "--navy": NAVY } as React.CSSProperties;

  const [page, setPage] = useState<"home" | "service" | "contact">("home");
  const [serviceKey, setServiceKey] = useState<string>("Instagram");
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__RUN_TESTS__) {
      runSelfTests();
    }
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onBook() {
    setPage("home");
    setServicesOpen(false);
    setTimeout(() => scrollToId("book"), 0);
  }

  function pickService(key: any) {
    setServiceKey(String(key));
    setPage("service");
    setServicesOpen(false);
  }

  return (
    <div style={rootStyle} className="min-h-screen flex flex-col bg-white text-[var(--navy)]">
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--navy)]/15">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            onClick={() => {
              setPage("home");
              setServicesOpen(false);
            }}
            className="flex items-center gap-3 text-left"
          >
            <LogoMark size={40} />
            <div className="leading-tight">
              <div className="text-base font-semibold text-[var(--navy)]">Summit Strategies</div>
              <div className="text-xs text-[var(--navy)]/60">AI Marketing & Systems</div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex relative">
            <button
              onClick={() => {
                setPage("home");
                setServicesOpen(false);
              }}
              className={cn(
                "text-sm font-medium",
                page === "home" ? "text-[var(--navy)]" : "text-[var(--navy)]/70 hover:text-[var(--navy)]"
              )}
            >
              Home
            </button>

            <div className="relative">
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium",
                  servicesOpen ? "text-[var(--navy)]" : "text-[var(--navy)]/70 hover:text-[var(--navy)]"
                )}
              >
                Services
                <span className={cn("transition", servicesOpen && "rotate-180")}>
                  <Icon name="chev-down" className="h-4 w-4" />
                </span>
              </button>

              <ServicesMenu
                open={servicesOpen}
                onClose={() => setServicesOpen(false)}
                onPick={(k: any) => pickService(k)}
                onBook={onBook}
              />
            </div>

            <button
              onClick={() => {
                setPage("contact");
                setServicesOpen(false);
              }}
              className={cn(
                "text-sm font-medium",
                page === "contact" ? "text-[var(--navy)]" : "text-[var(--navy)]/70 hover:text-[var(--navy)]"
              )}
            >
              Contact
            </button>
          </nav>

          <GoldButton onClick={onBook}>Book demo call</GoldButton>
        </div>
      </header>

      <main className="flex-1">
        {page === "home" ? <HomePage onBook={onBook} openServices={() => setServicesOpen(true)} /> : null}
        {page === "service" ? <ServiceDetailPage serviceKey={serviceKey} onBook={onBook} /> : null}

        {page === "contact" ? (
          <Section id="contact" className="pt-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[var(--navy)]/70">CONTACT</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--navy)]">Book Your Discovery Call</h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--navy)]/75 leading-relaxed">
                A discovery call is a quick conversation where we learn about your business, what you sell, and what you want to achieve. We’ll identify
                what’s currently holding your growth back, map the fastest path to more booked quotes, and show you exactly what we would implement
                (ads, automation, and follow-up systems) to get consistent high-quality enquiries.
              </p>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <p className="text-sm font-semibold text-[var(--navy)]">Send your details</p>
                  <p className="text-sm text-[var(--navy)]/70">We’ll reply with the next steps and confirm a time.</p>
                </CardHeader>
                <CardContent>
                  <GHLContactEmbed />
                </CardContent>
              </Card>
            </div>
          </Section>
        ) : null}
      </main>

      <footer className="bg-[var(--navy)] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-1">
                <LogoMark size={36} />
              </div>
              <div>
                <p className="text-sm font-semibold">Summit Strategies</p>
                <p className="text-xs text-white/70">© {new Date().getFullYear()} All rights reserved</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
              <button onClick={() => setPage("home")} className="hover:text-white">
                Home
              </button>
              <button onClick={() => setServicesOpen(true)} className="hover:text-white">
                Services
              </button>
              <button onClick={() => setPage("contact")} className="hover:text-white">
                Contact
              </button>

              <div className="mx-2 hidden sm:block h-5 w-px bg-white/20" aria-hidden />

              <a href="#" className="inline-flex items-center gap-2 hover:text-white" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center gap-2 hover:text-white" aria-label="Facebook">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center gap-2 hover:text-white" aria-label="LinkedIn">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

