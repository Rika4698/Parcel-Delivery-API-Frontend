"use client";

import { useState } from "react";
import { Link } from "react-router";

const faqs = [
  {
    category: "Delivery",
    icon: "🚚",
    question: "Does Delivo deliver across all of Bangladesh?",
    answer:
      "Yes. Delivo operates across all 64 districts of Bangladesh — from Dhaka and Chattogram to remote upazilas. Our extensive last-mile network ensures your parcels reach customers no matter where they are.",
  },
  {
    category: "Delivery",
    icon: "⚡",
    question: "How long does delivery take?",
    answer:
      "Standard delivery is 2-3 business days within the same city, 3-5 business days for inter-city delivery, and 5-7 business days for remote areas.",
  },
  {
    category: "Tracking",
    icon: "📍",
    question: "Can I track my parcel in real time?",
    answer:
      "Absolutely. Every shipment gets a unique tracking ID. Track live from the Delivo website. Customers receive updates at every stage — picked up, in transit, out for delivery, delivered.",
  },
  {
    category: "Pricing",
    icon: "💰",
    question: "How is the delivery charge calculated?",
    answer:
      "It's simple and transparent — Inside Dhaka: BDT 60 per kg. Outside Dhaka: BDT 120 per kg. No hidden charges. The exact fee is calculated automatically when you create a parcel based on weight and delivery zone.",
  },
  {
    category: "Pricing",
    icon: "💳",
    question: "Do you support Cash on Delivery (COD)?",
    answer:
      "Yes — full COD support across Bangladesh. Your customer pays on delivery, and we remit the collected amount directly to your account within 48 hours. No delays, no hassle.",
  },
  {
    category: "Business",
    icon: "🏢",
    question: "What benefits do enterprise merchants get?",
    answer:
      "Enterprise clients get a dedicated account manager, priority pickups, API integration for seamless e-commerce syncing, advanced analytics dashboard, custom SLAs, and volume discounts. Reach out to our sales team to get started.",
  },
  {
    category: "Business",
    icon: "🛡️",
    question: "What if a parcel is lost or damaged?",
    answer:
      "Every parcel on Delivo is insured. In the rare event of loss or damage, file a claim through your merchant dashboard or contact support. Verified claims are fully compensated within 7 business days — no questions asked.",
  },
  {
    category: "Tracking",
    icon: "🚀",
    question: "How do I create a Delivo parcel sender account?",
    answer:
      "Sign up is free and takes under 2 minutes. Register with email, verify your account, and you can start booking shipments immediately. No upfront fees, no contracts.",
  },
];

const categories = ["All", "Delivery", "Tracking", "Pricing", "Business"];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="faq-section relative py-24 md:py-32 overflow-hidden">

      {/* Background */}
      <div className="faq-mesh faq-grid absolute inset-0 pointer-events-none" />
      <div className="orb1 absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" />
      <div className="orb2 absolute bottom-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="faq-badge mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            FAQ
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-5">
            Got questions?{" "}
            <br />
            <span className="gradient-text">We've got answers.</span>
          </h2>

          <p className="text-lg font-medium text-muted-foreground" >
            Everything you need to know about Delivo's delivery platform,
            pricing and tools.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq-card ${isOpen ? "is-open" : ""}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{faq.icon}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="card-tag">{faq.category}</span>
                    </div>
                    <span className={`q-text ${isOpen ? "is-open" : ""}`} style={{ fontWeight: 600, fontSize: "15px", lineHeight: "1.4", display: "block", transition: "color 0.2s" }}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`toggle-btn ${isOpen ? "open" : ""}`}>
                    <svg className="toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </button>

                <div className={`faq-body ${isOpen ? "open" : ""}`}>
                  <div className="faq-body-inner">
                    <div className="px-6 pb-5 pl-[72px]">
                      <div className="faq-divider" />
                      <p className="a-text" style={{ fontSize: "14.5px", lineHeight: "1.75" }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="cta-card relative mt-12 p-8 md:p-10 text-center">
          <div className="cta-glow" />
          <div className="w-12 h-12 mx-auto mb-5 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 className="faq-heading cta-heading text-2xl font-bold mb-2">
            Still have questions?
          </h3>
          <p className="cta-sub mb-7" style={{ fontSize: "14px" }}>
            Our support team is available 7 days a week, 24 hours a day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Contact Support</Link>
          </div>
        </div>

      </div>
    </section>
  );
}