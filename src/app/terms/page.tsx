export const metadata = { title: "Terms & Conditions | NGANYA HIRE" };

const SECTIONS = [
  {
    h: "1. About the platform",
    p: "NGANYA HIRE is a marketplace that connects customers with vehicle owners and drivers. We do not own the vehicles listed and we are not a transport operator. The hire contract is between the customer and the vehicle owner.",
  },
  {
    h: "2. Bookings and availability",
    p: "A booking request is not a confirmed hire. A hire is confirmed only after the assigned driver confirms availability and the vehicle owner approves the request. Availability shown on a listing is indicative until those confirmations are recorded.",
  },
  {
    h: "3. Pricing",
    p: "Prices are set by vehicle owners and displayed on each listing, together with what the price includes. Additional charges must be disclosed before a request is submitted. Payment terms, including any deposit, are shown on the listing where the owner has configured them.",
  },
  {
    h: "4. Cancellations",
    p: "Customers may cancel a pending request from their dashboard. Cancellations after owner approval, and cancellations by an owner or driver, are handled through support and recorded against the booking.",
  },
  {
    h: "5. Driver and vehicle standards",
    p: "Drivers must hold a valid licence and complete identity verification before receiving assignments. Vehicle owners are responsible for the roadworthiness, insurance and licensing of their vehicles.",
  },
  {
    h: "6. Prohibited use",
    p: "Vehicles may not be used for illegal activity, unlicensed passenger transport, or any use that breaches Kenyan law. The driver may refuse or terminate a hire where the vehicle or passengers are at risk.",
  },
  {
    h: "7. Liability",
    p: "To the extent permitted by law, NGANYA HIRE is not liable for loss, injury or damage arising from the hire itself. Complaints about a hire should be raised with the owner and reported to us so we can review the listing.",
  },
  {
    h: "8. Changes",
    p: "We may update these terms as the platform evolves. Material changes will be announced on this page.",
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: October 2026</p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
