export const metadata = {
  title: "FAQs | NGANYA HIRE",
  description: "Answers about booking, availability, pricing and cancellations.",
};

const FAQS = [
  {
    q: "How do I know a nganya is actually free on my date?",
    a: "Every listing shows a live availability badge. When you pick a date we query existing confirmed bookings, blocked dates and the assigned driver's schedule. A green tick only appears when the driver has explicitly confirmed that date — never because nothing else was booked.",
  },
  {
    q: "Why does my booking say 'awaiting driver'?",
    a: "Your request has been sent to the driver assigned to that vehicle. They must confirm they are available before the owner can approve. You'll be notified as soon as they respond.",
  },
  {
    q: "Is the driver confirmation the same as approval?",
    a: "No. The driver confirming availability only means the date works for them. The vehicle owner still reviews the request and approves the hire.",
  },
  {
    q: "What does it cost?",
    a: "Each listing shows the owner's asking price and what it includes. Any additional charges are disclosed on the nganya page before you submit a request. You are not charged at request time.",
  },
  {
    q: "Can I cancel a request?",
    a: "Yes. You can cancel from your dashboard while a request is pending or awaiting confirmation. Once a booking is approved, contact support so the owner and driver can be notified.",
  },
  {
    q: "Do you operate outside Nairobi?",
    a: "Most vehicles are based in Nairobi and its environs. Each listing states its operating area; pickups outside that area may attract an additional charge.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Frequently asked questions</h1>
      <div className="mt-10 space-y-4">
        {FAQS.map((item) => (
          <details key={item.q} className="group rounded-xl border border-border/50 bg-card/30 p-5">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
