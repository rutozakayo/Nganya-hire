export const metadata = { title: "Privacy Policy | NGANYA HIRE" };

const SECTIONS = [
  {
    h: "1. What we collect",
    p: "Account details (name, email), booking details (dates, pickup and destination, event notes, passenger count), and for drivers and owners, identity and licence documents submitted for verification.",
  },
  {
    h: "2. Why we collect it",
    p: "To operate bookings, to let a driver and owner assess a request, to verify that drivers are who they say they are, and to keep an auditable record of approvals and status changes.",
  },
  {
    h: "3. Identity documents",
    p: "Licence and identity documents are stored privately. They are not served from public URLs and are accessible only to authorised platform administrators reviewing a verification. They are never shown on a public listing.",
  },
  {
    h: "4. Who sees your booking",
    p: "Your booking is visible to you, the assigned driver, the vehicle owner, and platform administrators. Other customers cannot see your bookings or contact details.",
  },
  {
    h: "5. Notifications",
    p: "We send in-app notifications about booking status changes. Web push is optional and only enabled if you grant permission in your browser.",
  },
  {
    h: "6. Retention",
    p: "Booking records are retained for accounting and dispute resolution. Verification documents are retained while the driver account is active and for a reasonable period afterwards to meet legal obligations.",
  },
  {
    h: "7. Your rights",
    p: "You can request access to, correction of, or deletion of your personal data by contacting support. Deleting an account does not remove records we are legally required to keep.",
  },
  {
    h: "8. Cookies",
    p: "We use a session cookie to keep you signed in. It is HTTP-only and is not used for advertising.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
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
