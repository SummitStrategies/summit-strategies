// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";

/* =====================================================
   Summit Strategies — Advisible-Inspired Bright Redesign
   - Light, airy, confident
   - Custom logo as hero centerpiece
   - Indigo (#4f46e5) + Coral (#f97316) accents
   - Inter + Instrument Serif typography
   - Inline styles only — no CSS variables
   - All GHL embeds preserved with fallbacks
===================================================== */

/* ---------- Color tokens ---------- */
const C = {
  indigo: "#4f46e5",
  indigoLight: "#6366f1",
  indigoDeep: "#3730a3",
  indigoDarkest: "#1e1b4b",
  indigoTint: "#ede9fe",
  indigoTintSoft: "#f5f3ff",
  coral: "#f97316",
  coralLight: "#fb923c",
  white: "#ffffff",
  warm: "#fafaf9",
  gray: "#f5f5f4",
  border: "#e7e5e4",
  borderSoft: "#f5f5f4",
  textDark: "#1c1917",
  textMuted: "#57534e",
  textLight: "#78716c",
  green: "#10b981",
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/V18dWeU8T1WVYtC2YZmm";
const FORM_URL = "https://api.leadconnectorhq.com/widget/form/NZnmokXvT1kCr3qEvP5W";

/* ---------- Reveal hook ---------- */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function FI({ children, delay = 0, style = {} }) {
  const { ref, vis } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `all .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Icons ---------- */
function Ico({ name, size = 20, color = "currentColor" }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const m = {
    "arrow-right": (
      <>
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </>
    ),
    "arrow-ne": (
      <>
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    "chev-down": <path d="M6 9l6 6 6-6" />,
    "chev-right": <path d="M9 18l6-6-6-6" />,
    check: <path d="M20 6L9 17l-5-5" />,
    shield: (
      <>
        <path d="M12 2l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V6l8-4z" />
      </>
    ),
    msg: <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />,
    cal: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V5" />
        <path d="M4 20h16" />
        <path d="M8 17v-6" />
        <path d="M12 17V7" />
        <path d="M16 17v-4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2c3 3.5 3 16.5 0 20M12 2c-3 3.5-3 16.5 0 20" />
      </>
    ),
    bot: (
      <>
        <path d="M12 2v3" />
        <rect x="4" y="7" width="16" height="14" rx="4" />
        <circle cx="8.5" cy="13" r="1.5" fill={color} />
        <circle cx="15.5" cy="13" r="1.5" fill={color} />
        <path d="M9 17h6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 4.18 2 2 0 015.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    ),
    star: (
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
        fill={color}
        stroke="none"
      />
    ),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    menu: <path d="M4 12h16M4 6h16M4 18h16" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
    "trending-up": (
      <>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </>
    ),
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    rocket: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  };
  return <svg {...p}>{m[name] || <circle cx="12" cy="12" r="9" />}</svg>;
}

/* ---------- Logo ---------- */
function SummitLogo({ size = 80, showWordmark = true }) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.15,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="summitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="summitGradSoft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#summitGradSoft)" />
        <path
          d="M 15 75 L 32 45 L 42 58 L 55 30 L 68 50 L 85 25"
          stroke="url(#summitGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="85" cy="25" r="3.5" fill="#f97316" />
        <circle cx="85" cy="25" r="6" fill="#f97316" fillOpacity="0.25" />
      </svg>
      {showWordmark && (
        <div style={{ textAlign: "center", lineHeight: 1, fontFamily: FONT }}>
          <div
            style={{
              fontSize: size * 0.18,
              fontWeight: 900,
              letterSpacing: "0.05em",
              color: C.textDark,
            }}
          >
            SUMMIT
          </div>
          <div
            style={{
              fontSize: size * 0.11,
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: C.textMuted,
              marginTop: size * 0.04,
            }}
          >
            STRATEGIES
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Buttons ---------- */
function PrimaryBtn({ children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 32px",
        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        transition: "all .25s",
        boxShadow: hover ? "0 12px 32px rgba(79,70,229,0.35)" : "0 4px 14px rgba(79,70,229,0.2)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function CoralBtn({ children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "18px 36px",
        background: hover ? C.coralLight : C.coral,
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        transition: "all .25s",
        boxShadow: hover ? "0 12px 32px rgba(249,115,22,0.35)" : "0 4px 14px rgba(249,115,22,0.2)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 32px",
        background: hover ? C.indigoTintSoft : C.white,
        color: C.textDark,
        border: `2px solid ${hover ? C.indigo : C.border}`,
        borderRadius: 12,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        transition: "all .25s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ---------- Service data ---------- */
const SERVICES_NAV = [
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

function getSvc(key) {
  const b = {
    Instagram: {
      title: "Instagram Ads",
      pitch:
        "Instagram is where attention lives. We use scroll-stopping creative and tight targeting to generate enquiries from people ready to book.",
      features: [
        { icon: "target", t: "Precise targeting", d: "Suburbs, radius, and intent signals." },
        { icon: "chart", t: "Creative testing", d: "Multiple ads tested to find top performers." },
        { icon: "bot", t: "Instant follow-up", d: "Speed-to-lead automation on every enquiry." },
      ],
      outcomes: ["Consistent enquiries", "Better conversion rates", "Scalable growth"],
      steps: ["Offer + angle selection", "Creative production", "Launch + test", "Optimise + scale"],
    },
    Facebook: {
      title: "Facebook Ads",
      pitch:
        "Trust-led campaigns that turn credibility — reviews, results, proof — into booked calls.",
      features: [
        { icon: "shield", t: "Trust-building", d: "Proof angles that increase conversions." },
        { icon: "target", t: "Smart targeting", d: "Audiences + behaviours to find real buyers." },
        { icon: "cal", t: "Booking flow", d: "Leads go straight into booking." },
      ],
      outcomes: ["Higher quality leads", "More quotes booked", "Lower wasted spend"],
      steps: ["Proof stack", "Campaign build", "Test + refine", "Scale"],
    },
    Google: {
      title: "Google Ads",
      pitch:
        "Capture intent-driven demand from people actively searching for your service right now.",
      features: [
        { icon: "globe", t: "High-intent keywords", d: "Searches that signal buying intent." },
        { icon: "chart", t: "Conversion tracking", d: "Pages with proper tracking setup." },
        { icon: "shield", t: "Budget efficiency", d: "Negative keywords to cut waste." },
      ],
      outcomes: ["More inbound calls", "Higher intent enquiries", "Better ROI"],
      steps: ["Keyword research", "Campaign structure", "Tracking setup", "Optimise + expand"],
    },
    "AI Receptionist": {
      title: "AI Receptionist",
      pitch:
        "Answers inbound calls instantly, places outbound follow-up calls, qualifies by voice, and books directly into your calendar — 24/7.",
      features: [
        { icon: "phone", t: "24/7 call handling", d: "Never miss an enquiry again." },
        { icon: "shield", t: "Smart qualification", d: "Filters out tyre-kickers automatically." },
        { icon: "cal", t: "Auto booking", d: "Confirms times + sends reminders." },
      ],
      outcomes: ["More qualified quotes", "Faster response times", "Less admin"],
      steps: ["Call received", "Qualify with questions", "Offer times", "Confirm + remind"],
    },
    "SMS Appointment Agent": {
      title: "SMS Appointment Agent",
      pitch:
        "Responds instantly to incoming SMS, qualifies clients, and books confirmed quotes automatically.",
      features: [
        { icon: "msg", t: "Instant text-back", d: "Auto reply within seconds." },
        { icon: "shield", t: "Qualification", d: "Confirms details before offering times." },
        { icon: "cal", t: "Auto booking", d: "Books and sends reminders." },
      ],
      outcomes: ["More recovered leads", "Less phone tag", "Higher close rate"],
      steps: ["SMS received", "Auto reply", "Qualify", "Book"],
    },
    "Social Media Manager": {
      title: "Social Media Management",
      pitch:
        "Consistent content that builds trust and supports your ads — without it taking over your week.",
      features: [
        { icon: "chart", t: "Content cadence", d: "Plan and publish consistently." },
        { icon: "shield", t: "Brand consistency", d: "Clear messaging that builds trust." },
        { icon: "target", t: "Conversion support", d: "Content that improves ad performance." },
      ],
      outcomes: ["More trust", "Better ad performance", "More enquiries"],
      steps: ["Content plan", "Create assets", "Post + engage", "Report"],
    },
    "Whatsapp AI Booking & Follow Up Agent": {
      title: "WhatsApp AI Call Agent",
      pitch:
        "Answers inbound WhatsApp voice calls, qualifies the client over the call, and books serious prospects directly into your calendar.",
      features: [
        { icon: "phone", t: "Call answering", d: "Answers WhatsApp calls instantly." },
        { icon: "target", t: "Voice qualification", d: "Structured questions during the call." },
        { icon: "cal", t: "Direct booking", d: "Books into your calendar." },
      ],
      outcomes: ["More booked calls", "Higher quality enquiries", "Less manual follow-up"],
      steps: ["Call received", "Qualify over voice", "Offer times", "Confirm booking"],
    },
    "Outbound WhatsApp Message Agent": {
      title: "Outbound WhatsApp Agent",
      pitch:
        "Re-engages past enquiries that never booked with a clear offer and easy booking via WhatsApp.",
      features: [
        { icon: "msg", t: "Instant reply", d: "Replies the moment an enquiry arrives." },
        { icon: "shield", t: "Qualification", d: "Filters time-wasters before booking." },
        { icon: "cal", t: "Auto booking", d: "Books with confirmations + reminders." },
      ],
      outcomes: ["More qualified quotes", "Faster response", "Less admin"],
      steps: ["Enquiry received", "WhatsApp message", "Qualify", "Book + remind"],
    },
    "Website Chatbot Agent": {
      title: "Website Chatbot",
      pitch:
        "Turns anonymous website visitors into qualified leads by answering questions, qualifying them, and booking calls.",
      features: [
        { icon: "msg", t: "Instant answers", d: "Handles FAQs and objections." },
        { icon: "shield", t: "Qualification", d: "Right questions before booking." },
        { icon: "cal", t: "Booking", d: "Books directly into your schedule." },
      ],
      outcomes: ["More booked chats", "Less manual follow-up", "Higher conversion"],
      steps: ["Chat starts", "Qualify", "Offer times", "Confirm"],
    },
    "CRM Tracking": {
      title: "CRM System",
      pitch:
        "Track every lead, source, follow-up, and outcome in one CRM — with automation already built so nothing slips through.",
      features: [
        { icon: "chart", t: "Full visibility", d: "Every lead, every stage, every result." },
        { icon: "bot", t: "Automation", d: "Instant follow-up sequences." },
        { icon: "shield", t: "Full access", d: "View everything, anytime." },
      ],
      outcomes: ["More booked clients", "Less admin", "Clear reporting"],
      steps: ["Connect sources", "Build pipeline", "Add automation", "Track results"],
    },
    SEO: {
      title: "SEO",
      pitch:
        "Your compounding asset — improve visibility for local service searches and get consistent inbound enquiries month after month.",
      features: [
        { icon: "globe", t: "Search visibility", d: "Rank for service area searches." },
        { icon: "chart", t: "Content + pages", d: "Pages that rank and convert." },
        { icon: "shield", t: "Technical fixes", d: "Speed, structure, crawlability." },
      ],
      outcomes: ["More inbound calls", "Lower cost per lead", "Stronger brand trust"],
      steps: ["Audit + plan", "On-page fixes", "Content creation", "Track + iterate"],
    },
  };
  return b[key] || b.Instagram;
}

const SERVICE_PILLS = [
  { label: "Google Ads", key: "Google" },
  { label: "Facebook Ads", key: "Facebook" },
  { label: "Instagram Ads", key: "Instagram" },
  { label: "AI Receptionist", key: "AI Receptionist" },
  { label: "SMS Agent", key: "SMS Appointment Agent" },
  { label: "WhatsApp Agent", key: "Whatsapp AI Booking & Follow Up Agent" },
  { label: "Website Chatbot", key: "Website Chatbot Agent" },
  { label: "CRM Tracking", key: "CRM Tracking" },
  { label: "SEO", key: "SEO" },
];

const TESTIMONIALS = [
  {
    name: "Ryan",
    co: "Soodie Fades",
    q: "Since working with Harsh, our bookings have grown consistently through paid ads and proper social media management. We're now attracting the right clients, filling more appointment slots each week, and building a stronger brand presence online without me having to manage everything myself.",
  },
  {
    name: "Shaan",
    co: "useflow.ai",
    q: "Working with Harsh to manage our paid ads and CRM systems significantly improved the consistency and quality of leads coming through. Campaign performance became far more predictable, our pipeline tracking improved, and follow-ups became automated instead of manual. This allowed our team to focus on closing deals and servicing clients while the system kept opportunities flowing in reliably.",
  },
];

/* ---------- GHL Embeds ---------- */
function BookingWidget() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: C.white,
        boxShadow: "0 24px 60px rgba(28,25,23,0.08)",
        border: `1px solid ${C.border}`,
      }}
    >
      {failed ? (
        <div
          style={{
            padding: "60px 40px",
            textAlign: "center",
            background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`,
            color: "#fff",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: C.coral,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Ico name="cal" size={32} color="#fff" />
          </div>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Book Your Strategy Call
          </h3>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 400,
              margin: "0 auto 32px",
              fontFamily: FONT,
            }}
          >
            Click below to open the booking calendar and pick a time that works for you.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              background: C.coral,
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Open Booking Calendar <Ico name="arrow-ne" size={16} color="#fff" />
          </a>
        </div>
      ) : (
        <>
          {!loaded && (
            <div
              style={{
                height: 1100,
                background: C.gray,
                animation: "sspulse 1.5s ease infinite",
              }}
            />
          )}
          <iframe
            src={BOOKING_URL}
            style={{
              width: "100%",
              height: 1100,
              border: 0,
              opacity: loaded ? 1 : 0,
              transition: "opacity .5s",
              display: loaded ? "block" : "none",
            }}
            title="Book"
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </div>
  );
}

function ContactForm() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (document.getElementById("ghl-js")) return;
    const s = document.createElement("script");
    s.id = "ghl-js";
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: C.white,
        boxShadow: "0 24px 60px rgba(28,25,23,0.08)",
        border: `1px solid ${C.border}`,
      }}
    >
      {failed ? (
        <div
          style={{
            padding: "60px 40px",
            textAlign: "center",
            background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`,
            color: "#fff",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: C.coral,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Ico name="msg" size={32} color="#fff" />
          </div>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 12px",
            }}
          >
            Get In Touch
          </h3>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              maxWidth: 400,
              margin: "0 auto 32px",
              fontFamily: FONT,
            }}
          >
            Click below to open the contact form and send us your details.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              background: C.coral,
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Open Contact Form <Ico name="arrow-ne" size={16} color="#fff" />
          </a>
        </div>
      ) : (
        <>
          {!loaded && (
            <div
              style={{
                height: 580,
                background: C.gray,
                animation: "sspulse 1.5s ease infinite",
              }}
            />
          )}
          <iframe
            src={FORM_URL}
            style={{
              width: "100%",
              height: 580,
              border: "none",
              opacity: loaded ? 1 : 0,
              transition: "opacity .5s",
              display: loaded ? "block" : "none",
            }}
            id="inline-NZnmokXvT1kCr3qEvP5W"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Website Contact Form"
            data-height="591"
            data-layout-iframe-id="inline-NZnmokXvT1kCr3qEvP5W"
            data-form-id="NZnmokXvT1kCr3qEvP5W"
            title="Contact"
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </div>
  );
}

/* ---------- Mega Menu ---------- */
function MegaMenu({ open, onClose, onPick, onBook }) {
  const ref = useRef(null);
  const [active, setActive] = useState("Paid Ads");

  useEffect(() => {
    if (open) setActive("Paid Ads");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, onClose]);

  if (!open) return null;
  const ai = SERVICES_NAV.find((s) => s.key === active);
  const icoMap = { "Paid Ads": "target", "AI Agents": "bot", "CRM Tracking": "chart", SEO: "globe" };
  const catInfo = {
    Instagram: "Scroll-stopping creative",
    Facebook: "Trust-led campaigns",
    Google: "High-intent search",
    "AI Receptionist": "24/7 AI calls",
    "SMS Appointment Agent": "SMS qualification",
    "Social Media Manager": "Consistent content",
    "Whatsapp AI Booking & Follow Up Agent": "WhatsApp voice agent",
    "Outbound WhatsApp Message Agent": "Re-engage cold leads",
    "Website Chatbot Agent": "Convert visitors",
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "100%",
        marginTop: 12,
        zIndex: 50,
        width: 820,
        maxWidth: "calc(100vw - 24px)",
        borderRadius: 20,
        background: C.white,
        border: `1px solid ${C.border}`,
        boxShadow: "0 32px 80px rgba(28,25,23,0.15)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
        <div style={{ padding: 16, borderRight: `1px solid ${C.border}`, background: C.warm }}>
          {SERVICES_NAV.map((s) => (
            <button
              key={s.key}
              onMouseEnter={() => setActive(s.key)}
              onClick={() => {
                if (!s.children?.length) onPick(s.key);
              }}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                marginBottom: 4,
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                background: s.key === active ? C.indigo : "transparent",
                color: s.key === active ? "#fff" : C.textDark,
                textAlign: "left",
                transition: "all .15s",
              }}
            >
              <Ico name={icoMap[s.key]} size={16} color={s.key === active ? "#fff" : C.indigo} />
              {s.key}
            </button>
          ))}
          <div
            style={{
              marginTop: 12,
              padding: 14,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0, fontFamily: FONT }}>
              Not sure where to start?
            </p>
            <button
              onClick={() => {
                onClose();
                onBook();
              }}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "8px 0",
                borderRadius: 8,
                background: C.coral,
                color: "#fff",
                border: "none",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Book free call →
            </button>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {ai?.children?.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ai.children.map((c) => (
                <button
                  key={c}
                  onClick={() => onPick(c)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    textAlign: "left",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.indigoTintSoft)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: C.indigoTint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Ico
                      name={
                        c.includes("Chat")
                          ? "msg"
                          : c.includes("SMS")
                          ? "msg"
                          : c.includes("Recep")
                          ? "phone"
                          : c.includes("WhatsApp") || c.includes("Whatsapp")
                          ? "msg"
                          : c.includes("Social")
                          ? "chart"
                          : "target"
                      }
                      size={16}
                      color={C.indigo}
                    />
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.textDark,
                        margin: 0,
                        fontFamily: FONT,
                      }}
                    >
                      {c}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: C.textLight,
                        margin: "2px 0 0",
                        fontFamily: FONT,
                      }}
                    >
                      {catInfo[c] || "View details"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 14, color: C.textMuted, fontFamily: FONT, lineHeight: 1.6 }}>
                {getSvc(active).pitch}
              </p>
              <button
                onClick={() => onPick(active)}
                style={{
                  marginTop: 16,
                  color: C.indigo,
                  fontWeight: 700,
                  fontSize: 13,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: FONT,
                }}
              >
                Learn more →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile drawer ---------- */
function MobileDrawer({ open, onClose, onNav, onBook }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28,25,23,0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          background: C.white,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          animation: "ssslide .25s ease",
        }}
      >
        <button
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <Ico name="x" size={24} color={C.textDark} />
        </button>
        <div style={{ marginTop: 24 }}>
          {["home", "services", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => {
                onNav(s);
                onClose();
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontSize: 18,
                fontWeight: 700,
                color: C.textDark,
                padding: "16px 0",
                borderBottom: `1px solid ${C.border}`,
                background: "none",
                border: "none",
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: C.border,
                cursor: "pointer",
                fontFamily: FONT,
                textTransform: "capitalize",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <PrimaryBtn
          onClick={() => {
            onBook();
            onClose();
          }}
          style={{ marginTop: 32, width: "100%", justifyContent: "center" }}
        >
          Book Free Call
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ---------- Service detail page ---------- */
function ServicePage({ sKey, onBook, onBack }) {
  const c = getSvc(sKey);
  return (
    <>
      <section
        style={{
          background: C.white,
          paddingTop: 140,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(79,70,229,0.08), transparent 60%)`,
          }}
        />
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FI>
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: C.textLight,
                fontSize: 13,
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: 32,
                fontFamily: FONT,
                fontWeight: 600,
              }}
            >
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
                <Ico name="arrow-right" size={16} color={C.textLight} />
              </span>
              All services
            </button>
            <p
              style={{
                color: C.coral,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: FONT,
              }}
            >
              SERVICE
            </p>
            <h1
              style={{
                fontFamily: FONT,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: C.textDark,
              }}
            >
              {c.title}
            </h1>
            <p
              style={{
                marginTop: 24,
                fontSize: 19,
                color: C.textMuted,
                maxWidth: 640,
                lineHeight: 1.7,
                fontFamily: FONT,
              }}
            >
              {c.pitch}
            </p>
            <PrimaryBtn onClick={onBook} style={{ marginTop: 32 }}>
              Work with us <Ico name="arrow-right" size={16} color="#fff" />
            </PrimaryBtn>
          </FI>
        </div>
      </section>

      <section style={{ background: C.warm, padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <FI>
            <p
              style={{
                color: C.coral,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: FONT,
                margin: "0 0 12px",
              }}
            >
              WHAT'S INCLUDED
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 900,
                color: C.textDark,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              How it works
            </h2>
          </FI>
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {c.features.map((f, i) => (
              <FI key={f.t} delay={i * 0.08}>
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 32,
                    height: "100%",
                    transition: "all .25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(28,25,23,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Ico name={f.icon} size={24} color="#fff" />
                  </div>
                  <h3
                    style={{
                      fontFamily: FONT,
                      fontSize: 18,
                      fontWeight: 800,
                      color: C.textDark,
                      margin: 0,
                    }}
                  >
                    {f.t}
                  </h3>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: C.textMuted,
                      lineHeight: 1.6,
                      fontFamily: FONT,
                    }}
                  >
                    {f.d}
                  </p>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "100px 0" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 56,
          }}
        >
          <FI>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.coral,
                margin: "0 0 12px",
              }}
            >
              PROCESS
            </p>
            <h3
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 900,
                color: C.textDark,
                margin: "0 0 32px",
                letterSpacing: "-0.02em",
              }}
            >
              Step by step
            </h3>
            {c.steps.map((s, i) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: C.warm,
                  borderRadius: 12,
                  border: `1px solid ${C.border}`,
                  padding: 20,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 14, color: C.textMuted, margin: 0, fontFamily: FONT }}>{s}</p>
              </div>
            ))}
          </FI>
          <FI delay={0.1}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.coral,
                margin: "0 0 12px",
              }}
            >
              OUTCOMES
            </p>
            <h3
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 900,
                color: C.textDark,
                margin: "0 0 32px",
                letterSpacing: "-0.02em",
              }}
            >
              What you get
            </h3>
            {c.outcomes.map((o) => (
              <div
                key={o}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: C.warm,
                  borderRadius: 12,
                  border: `1px solid ${C.border}`,
                  padding: 20,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: C.coral,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Ico name="check" size={20} color="#fff" />
                </span>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.textDark,
                    margin: 0,
                    fontFamily: FONT,
                  }}
                >
                  {o}
                </p>
              </div>
            ))}
            <PrimaryBtn onClick={onBook} style={{ marginTop: 32 }}>
              Book your call <Ico name="arrow-right" size={16} color="#fff" />
            </PrimaryBtn>
          </FI>
        </div>
      </section>
    </>
  );
}

/* ==== MAIN ==== */
export default function SummitStrategiesSite() {
  const [page, setPage] = useState("home");
  const [sKey, setSKey] = useState("Instagram");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  function scrollTo(id) {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }
  function onBook() {
    setPage("home");
    setMenuOpen(false);
    setMobOpen(false);
    scrollTo("book");
  }
  function pickSvc(k) {
    setSKey(k);
    setPage("service");
    setMenuOpen(false);
    setMobOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function onNav(s) {
    if (s === "home") {
      setPage("home");
      window.scrollTo({ top: 0 });
    } else if (s === "services") setMenuOpen((o) => !o);
    else if (s === "contact") {
      setPage("contact");
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT,
        WebkitFontSmoothing: "antialiased",
        background: C.white,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif&display=swap');
        @keyframes ssmarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ssfloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes ssslide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes sspulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes sspulsedot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: ${FONT}; }
        ::selection { background: rgba(79,70,229,0.2); }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all .3s",
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(28,25,23,0.06)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
          }}
        >
          <button
            onClick={() => onNav("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <SummitLogo size={42} showWordmark={false} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span
                style={{
                  color: C.textDark,
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: "-0.01em",
                }}
              >
                Summit Strategies
              </span>
              <span
                style={{
                  color: C.textLight,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                AI Marketing
              </span>
            </div>
          </button>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              position: "relative",
            }}
          >
            {["Home", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  item === "Services" ? setMenuOpen((o) => !o) : onNav(item.toLowerCase())
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: C.textDark,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: FONT,
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.indigoTintSoft)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {item}
                {item === "Services" && (
                  <span
                    style={{
                      transition: "transform .2s",
                      transform: menuOpen ? "rotate(180deg)" : "none",
                      display: "inline-flex",
                    }}
                  >
                    <Ico name="chev-down" size={14} color={C.textDark} />
                  </span>
                )}
              </button>
            ))}
            <MegaMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              onPick={pickSvc}
              onBook={onBook}
            />
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PrimaryBtn onClick={onBook} style={{ padding: "12px 22px", fontSize: 13 }}>
              Book Free Call <Ico name="arrow-right" size={14} color="#fff" />
            </PrimaryBtn>
          </div>
        </div>
      </header>
      <MobileDrawer
        open={mobOpen}
        onClose={() => setMobOpen(false)}
        onNav={onNav}
        onBook={onBook}
      />

      {/* MAIN */}
      <main style={{ flex: 1 }}>
        {page === "home" && (
          <>
            {/* ===== HERO ===== */}
            <section
              style={{
                background: C.white,
                position: "relative",
                overflow: "hidden",
                paddingTop: 120,
                paddingBottom: 80,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "-10%",
                  width: 600,
                  height: 600,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(79,70,229,0.08), transparent 60%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20%",
                  left: "-15%",
                  width: 500,
                  height: 500,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(249,115,22,0.06), transparent 60%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "60px 24px",
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr",
                  gap: 60,
                  alignItems: "center",
                }}
                className="hero-grid"
              >
                <div>
                  <FI>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 24,
                        fontFamily: FONT,
                      }}
                    >
                      REAL STRATEGIES · RELENTLESS EXECUTION · PROVEN RESULTS
                    </p>
                  </FI>

                  <FI delay={0.08}>
                    <h1
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                        color: C.textDark,
                        margin: 0,
                      }}
                    >
                      Award-winning AI marketing for businesses ready to{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.coral,
                          fontWeight: 400,
                        }}
                      >
                        grow.
                      </span>
                    </h1>
                  </FI>

                  <FI delay={0.16}>
                    <p
                      style={{
                        marginTop: 28,
                        fontSize: 19,
                        color: C.textMuted,
                        maxWidth: 560,
                        lineHeight: 1.65,
                        fontFamily: FONT,
                      }}
                    >
                      We combine paid ads, AI automation, and CRM systems to bring you consistent,
                      high-quality enquiries — then book them automatically.
                    </p>
                  </FI>

                  <FI delay={0.24}>
                    <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14 }}>
                      <PrimaryBtn onClick={onBook}>
                        Get a Free Strategy Call <Ico name="arrow-right" size={16} color="#fff" />
                      </PrimaryBtn>
                      <OutlineBtn onClick={() => scrollTo("services")}>See Our Services</OutlineBtn>
                    </div>
                  </FI>
                </div>

                <FI delay={0.18}>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 40,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(circle, rgba(79,70,229,0.12), rgba(249,115,22,0.08), transparent 70%)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ animation: "ssfloat 5s ease-in-out infinite" }}>
                      <SummitLogo size={280} showWordmark={true} />
                    </div>
                  </div>
                </FI>
              </div>
            </section>

            {/* MARQUEE */}
            <div
              style={{
                background: C.warm,
                padding: "18px 0",
                overflow: "hidden",
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  animation: "ssmarquee 50s linear infinite",
                }}
              >
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: C.textLight,
                        fontFamily: FONT,
                        marginRight: 48,
                      }}
                    >
                      ★ AI-POWERED MARKETING ★ TRUSTED BY GROWING BUSINESSES ★ AUSTRALIAN OWNED ★
                      RESULTS-DRIVEN ★ 24/7 AUTOMATION
                    </span>
                  ))}
              </div>
            </div>

            {/* ===== SERVICES PILLS ===== */}
            <section
              id="services"
              style={{ background: C.white, padding: "100px 0" }}
            >
              <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <FI>
                  <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                        fontFamily: FONT,
                      }}
                    >
                      OUR SERVICES
                    </p>
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                        fontWeight: 900,
                        color: C.textDark,
                        lineHeight: 1.1,
                        letterSpacing: "-0.025em",
                        margin: "0 0 16px",
                      }}
                    >
                      Discover what we do{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.indigo,
                          fontWeight: 400,
                        }}
                      >
                        best
                      </span>
                    </h2>
                    <p
                      style={{
                        fontSize: 17,
                        color: C.textMuted,
                        maxWidth: 580,
                        margin: "0 auto",
                        lineHeight: 1.65,
                        fontFamily: FONT,
                      }}
                    >
                      Each service works together to form a complete growth engine for your
                      business.
                    </p>
                  </div>
                </FI>
                <FI delay={0.1}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                      justifyContent: "center",
                      maxWidth: 900,
                      margin: "0 auto",
                    }}
                  >
                    {SERVICE_PILLS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => pickSvc(p.key)}
                        style={{
                          padding: "14px 26px",
                          borderRadius: 999,
                          border: `1.5px solid ${C.border}`,
                          background: C.white,
                          color: C.textDark,
                          fontFamily: FONT,
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all .25s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = C.indigo;
                          e.currentTarget.style.background = C.indigoTintSoft;
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.color = C.indigo;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = C.border;
                          e.currentTarget.style.background = C.white;
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.color = C.textDark;
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </FI>
              </div>
            </section>

            {/* ===== WHY ===== */}
            <section style={{ background: C.warm, padding: "100px 0" }}>
              <div
                style={{
                  maxWidth: 1100,
                  margin: "0 auto",
                  padding: "0 24px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                }}
                className="why-grid"
              >
                <FI>
                  <p
                    style={{
                      color: C.coral,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                      fontFamily: FONT,
                    }}
                  >
                    WHY WORK WITH US
                  </p>
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 900,
                      color: C.textDark,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    We're{" "}
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        color: C.indigo,
                        fontWeight: 400,
                      }}
                    >
                      relentless
                    </span>{" "}
                    about getting you results.
                  </h2>
                  <p
                    style={{
                      marginTop: 24,
                      fontSize: 16,
                      color: C.textMuted,
                      lineHeight: 1.7,
                      fontFamily: FONT,
                    }}
                  >
                    Most businesses lose leads because they're too slow to respond. We fix that with
                    a system that attracts high-intent enquiries through targeted ads, then
                    instantly qualifies and books them using AI — so you spend less time chasing
                    and more time doing the work that pays.
                  </p>
                  <p
                    style={{
                      marginTop: 16,
                      fontSize: 16,
                      color: C.textMuted,
                      lineHeight: 1.7,
                      fontFamily: FONT,
                    }}
                  >
                    From the first ad impression to a confirmed booking in your calendar, we handle
                    the entire pipeline so nothing slips through the cracks. No fluff, no excuses,
                    just real results.
                  </p>
                </FI>
                <FI delay={0.12}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      {
                        icon: "zap",
                        t: "Lightning-fast follow-up",
                        d: "AI agents respond in seconds, not hours. Beat every competitor to the lead.",
                      },
                      {
                        icon: "bot",
                        t: "End-to-end automation",
                        d: "From the first ad click to a confirmed booking, we handle the whole pipeline.",
                      },
                      {
                        icon: "chart",
                        t: "Transparent, real results",
                        d: "You see every lead, every conversation, every booking in your CRM — always.",
                      },
                    ].map((item) => (
                      <div
                        key={item.t}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 16,
                          padding: 24,
                          borderRadius: 16,
                          background: C.white,
                          border: `1px solid ${C.border}`,
                          transition: "all .25s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 16px 40px rgba(28,25,23,0.08)";
                          e.currentTarget.style.borderColor = C.indigoLight;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = C.border;
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Ico name={item.icon} size={22} color="#fff" />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: FONT,
                              fontWeight: 800,
                              fontSize: 16,
                              color: C.textDark,
                              margin: 0,
                            }}
                          >
                            {item.t}
                          </p>
                          <p
                            style={{
                              fontSize: 14,
                              color: C.textMuted,
                              margin: "6px 0 0",
                              lineHeight: 1.55,
                              fontFamily: FONT,
                            }}
                          >
                            {item.d}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FI>
              </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section
              style={{
                background: C.white,
                padding: "80px 0",
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <FI>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 0,
                    }}
                  >
                    {[
                      { v: "24/7", l: "AI agents working" },
                      { v: "<60s", l: "Average response time" },
                      { v: "100%", l: "Pipeline visibility" },
                      { v: "0", l: "Leads slipping through" },
                    ].map((s, i) => (
                      <div
                        key={s.l}
                        style={{
                          textAlign: "center",
                          borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                          padding: "0 16px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FONT,
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 900,
                            color: C.indigo,
                            letterSpacing: "-0.03em",
                            lineHeight: 1,
                          }}
                        >
                          {s.v}
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                            fontSize: 12,
                            color: C.textLight,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontFamily: FONT,
                          }}
                        >
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </FI>
              </div>
            </section>

            {/* ===== TESTIMONIALS (DARK) ===== */}
            <section
              style={{
                background: C.indigoDeep,
                padding: "100px 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -200,
                  right: -200,
                  width: 500,
                  height: 500,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(249,115,22,0.15), transparent 60%)`,
                }}
              />
              <div
                style={{
                  maxWidth: 1100,
                  margin: "0 auto",
                  padding: "0 24px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <FI>
                  <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                        fontFamily: FONT,
                      }}
                    >
                      TESTIMONIALS
                    </p>
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      What our clients are{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.coral,
                          fontWeight: 400,
                        }}
                      >
                        saying
                      </span>
                    </h2>
                  </div>
                </FI>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                    gap: 24,
                    maxWidth: 1000,
                    margin: "0 auto",
                  }}
                >
                  {TESTIMONIALS.map((t, i) => (
                    <FI key={t.name} delay={i * 0.1}>
                      <div
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 20,
                          padding: 36,
                          height: "100%",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Ico key={s} name="star" size={18} color={C.coral} />
                          ))}
                        </div>
                        <p
                          style={{
                            fontFamily: SERIF,
                            fontStyle: "italic",
                            fontSize: 19,
                            color: "rgba(255,255,255,0.92)",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          "{t.q}"
                        </p>
                        <div
                          style={{
                            marginTop: 28,
                            paddingTop: 24,
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: FONT,
                              fontWeight: 800,
                              fontSize: 16,
                              color: "#fff",
                              margin: 0,
                            }}
                          >
                            {t.name}
                          </p>
                          <p
                            style={{
                              fontSize: 13,
                              color: "rgba(255,255,255,0.55)",
                              margin: "4px 0 0",
                              fontFamily: FONT,
                              fontWeight: 500,
                            }}
                          >
                            {t.co}
                          </p>
                        </div>
                      </div>
                    </FI>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== FEATURED RESULTS (PLACEHOLDER CASE STUDIES) ===== */}
            <section style={{ background: C.white, padding: "100px 0" }}>
              <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <FI>
                  <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                        fontFamily: FONT,
                      }}
                    >
                      CASE STUDIES
                    </p>
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 900,
                        color: C.textDark,
                        letterSpacing: "-0.02em",
                        margin: "0 0 16px",
                      }}
                    >
                      Results we're{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.indigo,
                          fontWeight: 400,
                        }}
                      >
                        building
                      </span>
                    </h2>
                    <p
                      style={{
                        fontSize: 17,
                        color: C.textMuted,
                        maxWidth: 600,
                        margin: "0 auto",
                        lineHeight: 1.65,
                        fontFamily: FONT,
                      }}
                    >
                      Real campaigns currently in flight. Check back soon for full case studies.
                    </p>
                  </div>
                </FI>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 24,
                  }}
                >
                  {[
                    {
                      bg: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                      cat: "SERVICE BUSINESS",
                      t: "Local trades growth campaign",
                      d: "A multi-channel paid ads + AI booking system rollout. Full case study coming soon.",
                    },
                    {
                      bg: "linear-gradient(135deg, #fef3c7, #fed7aa)",
                      cat: "E-COMMERCE",
                      t: "D2C brand scaling project",
                      d: "Conversion-optimised funnel + automated nurture sequence. Full case study coming soon.",
                    },
                    {
                      bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                      cat: "PROFESSIONAL SERVICES",
                      t: "Lead generation pipeline build",
                      d: "End-to-end CRM build with AI receptionist + SMS qualification. Full case study coming soon.",
                    },
                  ].map((card, i) => (
                    <FI key={card.t} delay={i * 0.1}>
                      <div
                        style={{
                          borderRadius: 20,
                          background: card.bg,
                          padding: 32,
                          height: "100%",
                          minHeight: 280,
                          position: "relative",
                          overflow: "hidden",
                          border: `1px solid ${C.border}`,
                          transition: "all .3s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow = "0 20px 50px rgba(28,25,23,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: C.coral,
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: 999,
                            fontFamily: FONT,
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                          }}
                        >
                          <Ico name="rocket" size={12} color="#fff" />
                          IN PROGRESS
                        </div>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            color: C.indigoDeep,
                            margin: "0 0 16px",
                          }}
                        >
                          {card.cat}
                        </p>
                        <h3
                          style={{
                            fontFamily: FONT,
                            fontSize: 22,
                            fontWeight: 900,
                            color: C.textDark,
                            lineHeight: 1.2,
                            margin: "0 0 12px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {card.t}
                        </h3>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: 14,
                            color: C.textMuted,
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {card.d}
                        </p>
                      </div>
                    </FI>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== AI SPOTLIGHT ===== */}
            <section style={{ background: C.warm, padding: "100px 0" }}>
              <div
                style={{
                  maxWidth: 1100,
                  margin: "0 auto",
                  padding: "0 24px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                }}
                className="ai-grid"
              >
                <FI>
                  <p
                    style={{
                      color: C.coral,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                      fontFamily: FONT,
                    }}
                  >
                    FEATURED SOLUTION
                  </p>
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 900,
                      color: C.textDark,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    Your AI receptionist{" "}
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        color: C.indigo,
                        fontWeight: 400,
                      }}
                    >
                      never sleeps.
                    </span>
                  </h2>
                  <p
                    style={{
                      marginTop: 24,
                      fontSize: 16,
                      color: C.textMuted,
                      lineHeight: 1.7,
                      fontFamily: FONT,
                    }}
                  >
                    Miss a call, lose a lead. Our AI receptionist answers inbound calls instantly,
                    makes outbound follow-up calls within seconds, qualifies the enquiry, and books
                    them directly into your calendar — even after hours, even while you're on the
                    tools.
                  </p>
                  <div style={{ marginTop: 28 }}>
                    {[
                      "Responds in seconds, not hours",
                      "Filters tyre-kickers automatically",
                      "Books confirmed quotes with reminders",
                    ].map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: C.coral,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Ico name="check" size={14} color="#fff" />
                        </span>
                        <p
                          style={{
                            fontSize: 15,
                            color: C.textDark,
                            margin: 0,
                            fontFamily: FONT,
                            fontWeight: 600,
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <PrimaryBtn onClick={onBook}>
                      Try it for your business <Ico name="arrow-right" size={16} color="#fff" />
                    </PrimaryBtn>
                    <OutlineBtn onClick={() => pickSvc("AI Receptionist")}>Learn more</OutlineBtn>
                  </div>
                </FI>

                <FI delay={0.12}>
                  <div
                    style={{
                      borderRadius: 24,
                      background: `linear-gradient(135deg, ${C.indigoDeep}, ${C.indigo})`,
                      padding: 36,
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 24px 60px rgba(79,70,229,0.25)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle at 80% 20%, rgba(249,115,22,0.25), transparent 50%)`,
                      }}
                    />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          color: "rgba(255,255,255,0.6)",
                          textTransform: "uppercase",
                          fontFamily: FONT,
                          marginBottom: 24,
                        }}
                      >
                        Live Agent Flow
                      </p>
                      {[
                        "Lead calls your business",
                        "AI answers and qualifies",
                        "Booking offered to qualified leads",
                        "Confirmed quote in your calendar",
                      ].map((s, i) => (
                        <div key={s}>
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 12,
                                background: "rgba(255,255,255,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: FONT,
                                fontWeight: 900,
                                fontSize: 14,
                                color: C.coral,
                                flexShrink: 0,
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div
                              style={{
                                flex: 1,
                                borderRadius: 12,
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                padding: "14px 20px",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: 14,
                                  color: "rgba(255,255,255,0.85)",
                                  margin: 0,
                                  fontFamily: FONT,
                                  fontWeight: 500,
                                }}
                              >
                                {s}
                              </p>
                            </div>
                          </div>
                          {i < 3 && (
                            <div
                              style={{
                                width: 1,
                                height: 16,
                                background: "rgba(255,255,255,0.1)",
                                marginLeft: 21,
                              }}
                            />
                          )}
                        </div>
                      ))}
                      <div
                        style={{
                          marginTop: 24,
                          borderRadius: 12,
                          background: "rgba(249,115,22,0.15)",
                          border: "1px solid rgba(249,115,22,0.3)",
                          padding: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <Ico name="trending-up" size={20} color={C.coral} />
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#fff",
                            margin: 0,
                            fontFamily: FONT,
                          }}
                        >
                          Result: More jobs booked, zero manual work
                        </p>
                      </div>
                    </div>
                  </div>
                </FI>
              </div>
            </section>

            {/* ===== PROCESS ===== */}
            <section style={{ background: C.white, padding: "100px 0" }}>
              <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <FI>
                  <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                        fontFamily: FONT,
                      }}
                    >
                      HOW WE WORK
                    </p>
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 900,
                        color: C.textDark,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      From discovery to scale in{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.indigo,
                          fontWeight: 400,
                        }}
                      >
                        4 steps.
                      </span>
                    </h2>
                  </div>
                </FI>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 24,
                  }}
                >
                  {[
                    {
                      n: "01",
                      t: "Discovery",
                      d: "We learn about your business, goals, and what's holding growth back.",
                    },
                    {
                      n: "02",
                      t: "Strategy",
                      d: "We map the fastest path to more booked quotes and build your custom system.",
                    },
                    {
                      n: "03",
                      t: "Launch",
                      d: "Campaigns go live, AI agents activate, and we optimise on real data.",
                    },
                    {
                      n: "04",
                      t: "Scale",
                      d: "We double down on what works — more enquiries, more bookings, more revenue.",
                    },
                  ].map((s, i) => (
                    <FI key={s.n} delay={i * 0.08}>
                      <div
                        style={{
                          background: C.warm,
                          border: `1px solid ${C.border}`,
                          borderRadius: 16,
                          padding: 32,
                          height: "100%",
                          transition: "all .3s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow = "0 20px 50px rgba(79,70,229,0.12)";
                          e.currentTarget.style.borderColor = C.indigoLight;
                          const num = e.currentTarget.querySelector(".step-num");
                          if (num) num.style.color = C.indigo;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = C.border;
                          const num = e.currentTarget.querySelector(".step-num");
                          if (num) num.style.color = C.indigoTint;
                        }}
                      >
                        <span
                          className="step-num"
                          style={{
                            fontFamily: FONT,
                            fontSize: 60,
                            fontWeight: 900,
                            color: C.indigoTint,
                            display: "block",
                            marginBottom: 12,
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            transition: "color .3s",
                          }}
                        >
                          {s.n}
                        </span>
                        <h3
                          style={{
                            fontFamily: FONT,
                            fontSize: 19,
                            fontWeight: 800,
                            color: C.textDark,
                            margin: "0 0 8px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {s.t}
                        </h3>
                        <p
                          style={{
                            fontSize: 14,
                            color: C.textMuted,
                            lineHeight: 1.6,
                            margin: 0,
                            fontFamily: FONT,
                          }}
                        >
                          {s.d}
                        </p>
                      </div>
                    </FI>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section
              style={{
                background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`,
                position: "relative",
                overflow: "hidden",
                padding: "100px 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at center, rgba(249,115,22,0.2), transparent 60%)`,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  maxWidth: 800,
                  margin: "0 auto",
                  padding: "0 24px",
                  textAlign: "center",
                }}
              >
                <FI>
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                      margin: 0,
                    }}
                  >
                    Ready to stop chasing leads and start{" "}
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        color: C.coralLight,
                        fontWeight: 400,
                      }}
                    >
                      booking jobs?
                    </span>
                  </h2>
                  <p
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: FONT,
                      lineHeight: 1.6,
                    }}
                  >
                    Book a free strategy call. We'll show you exactly what we'd build for your
                    business.
                  </p>
                  <CoralBtn onClick={onBook} style={{ marginTop: 36 }}>
                    Book Your Free Strategy Call <Ico name="arrow-right" size={16} color="#fff" />
                  </CoralBtn>
                </FI>
              </div>
            </section>

            {/* ===== BOOKING ===== */}
            <section id="book" style={{ background: C.warm, padding: "100px 0" }}>
              <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
                <FI>
                  <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p
                      style={{
                        color: C.coral,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                        fontFamily: FONT,
                      }}
                    >
                      BOOK A CALL
                    </p>
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(2rem, 4vw, 2.75rem)",
                        fontWeight: 900,
                        color: C.textDark,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      Let's talk about{" "}
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          color: C.indigo,
                          fontWeight: 400,
                        }}
                      >
                        growing
                      </span>{" "}
                      your business.
                    </h2>
                    <p
                      style={{
                        marginTop: 16,
                        color: C.textMuted,
                        fontFamily: FONT,
                        fontSize: 17,
                        lineHeight: 1.6,
                      }}
                    >
                      Pick a time below — we'll jump on a quick call to map out your growth plan.
                    </p>
                  </div>
                </FI>
                <FI delay={0.1}>
                  <BookingWidget />
                </FI>
              </div>
            </section>
          </>
        )}

        {page === "service" && (
          <ServicePage
            sKey={sKey}
            onBook={onBook}
            onBack={() => {
              setPage("home");
              window.scrollTo({ top: 0 });
            }}
          />
        )}

        {page === "contact" && (
          <section style={{ background: C.white, paddingTop: 140, paddingBottom: 100 }}>
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "0 24px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "start",
              }}
              className="contact-grid"
            >
              <FI>
                <p
                  style={{
                    color: C.coral,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                    fontFamily: FONT,
                  }}
                >
                  CONTACT
                </p>
                <h1
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 900,
                    color: C.textDark,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    margin: 0,
                  }}
                >
                  Book your{" "}
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      color: C.indigo,
                      fontWeight: 400,
                    }}
                  >
                    discovery call.
                  </span>
                </h1>
                <p
                  style={{
                    marginTop: 24,
                    fontSize: 17,
                    color: C.textMuted,
                    lineHeight: 1.7,
                    fontFamily: FONT,
                    maxWidth: 480,
                  }}
                >
                  A quick conversation where we learn about your business and map the fastest path
                  to more qualified bookings.
                </p>
                <div style={{ marginTop: 32 }}>
                  {[
                    { icon: "cal", t: "15–30 minute call", d: "Quick, focused, zero fluff." },
                    { icon: "target", t: "Custom growth plan", d: "Tailored to your business." },
                    { icon: "zap", t: "Zero obligation", d: "Just clarity on your next move." },
                  ].map((item) => (
                    <div
                      key={item.t}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        padding: 22,
                        borderRadius: 14,
                        border: `1px solid ${C.border}`,
                        background: C.warm,
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoLight})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Ico name={item.icon} size={20} color="#fff" />
                      </span>
                      <div>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontWeight: 800,
                            fontSize: 15,
                            color: C.textDark,
                            margin: 0,
                          }}
                        >
                          {item.t}
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            color: C.textMuted,
                            margin: "4px 0 0",
                            fontFamily: FONT,
                          }}
                        >
                          {item.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FI>
              <FI delay={0.1}>
                <ContactForm />
              </FI>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: C.indigoDarkest, color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 48,
              marginBottom: 48,
            }}
          >
            <div style={{ maxWidth: 320 }}>
              <SummitLogo size={56} showWordmark={true} />
              <p
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  fontFamily: FONT,
                }}
              >
                AI-powered marketing systems that bring consistent enquiries and book them
                automatically.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    fontFamily: FONT,
                    marginBottom: 16,
                  }}
                >
                  Pages
                </p>
                {[
                  { l: "Home", a: "home" },
                  { l: "Services", a: "services" },
                  { l: "Contact", a: "contact" },
                ].map((item) => (
                  <button
                    key={item.l}
                    onClick={() => onNav(item.a)}
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.65)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: 10,
                      fontFamily: FONT,
                      fontWeight: 500,
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    {item.l}
                  </button>
                ))}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    fontFamily: FONT,
                    marginBottom: 16,
                  }}
                >
                  Services
                </p>
                {[
                  { l: "Paid Ads", k: "Instagram" },
                  { l: "AI Agents", k: "AI Receptionist" },
                  { l: "CRM", k: "CRM Tracking" },
                  { l: "SEO", k: "SEO" },
                ].map((item) => (
                  <button
                    key={item.l}
                    onClick={() => pickSvc(item.k)}
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.65)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: 10,
                      fontFamily: FONT,
                      fontWeight: 500,
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    {item.l}
                  </button>
                ))}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    fontFamily: FONT,
                    marginBottom: 16,
                  }}
                >
                  Connect
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { name: "Instagram", path: "M3 3h18v18H3z" },
                    { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                    { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V9h4v2" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href="#"
                      aria-label={s.name}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "all .2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                        fill="none"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              fontFamily: FONT,
            }}
          >
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Summit Strategies. All rights reserved.</p>
            <p style={{ margin: 0 }}>AI Marketing & Systems</p>
          </div>
        </div>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid, .why-grid, .ai-grid, .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
