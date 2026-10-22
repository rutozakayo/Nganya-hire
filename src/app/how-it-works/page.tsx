import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, CalendarCheck, UserCheck, PartyPopper } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "1. Find your nganya",
    body: "Browse the fleet and filter by date, pickup area, budget, passenger capacity and the features that matter — sound, screens, lighting, interior.",
  },
  {
    icon: CalendarCheck,
    title: "2. Pick a date",
    body: "Choose your event date. We check the vehicle's calendar and the assigned driver's schedule in Africa/Nairobi time before you submit anything.",
  },
  {
    icon: UserCheck,
    title: "3. Driver confirms",
    body: "The driver is notified and must explicitly confirm they are available. No response means no green tick — we never assume availability.",
  },
  {
    icon: PartyPopper,
    title: "4. Owner approves, you ride",
    body: "The vehicle owner reviews the request and approves it. You get a notification at every status change, and the booking is locked into the calendar.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">How NGANYA HIRE works</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Four steps, two human confirmations. Your date is only blocked once the driver has confirmed
        availability and the owner has approved the hire.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {STEPS.map((step) => (
          <Card key={step.title} className="border-border/50 bg-card/30">
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold">{step.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border/50 bg-card/30 p-8">
        <h2 className="text-xl font-bold">What the price includes</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• The vehicle and a verified driver for the agreed hire window.</li>
          <li>• Fuel within the agreed operating area unless stated otherwise on the listing.</li>
          <li>• Any extra charges are shown on the nganya page before you submit a request.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/browse" className={buttonVariants({ className: "bg-primary font-bold text-primary-foreground" })}>
            Explore Nganyas
          </Link>
          <Link href="/owner/register" className={buttonVariants({ variant: "outline" })}>
            List Your Nganya
          </Link>
        </div>
      </div>
    </div>
  );
}
