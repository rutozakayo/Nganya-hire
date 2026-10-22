import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact & Support | NGANYA HIRE",
  description: "Get in touch with the NGANYA HIRE team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Contact &amp; support</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Questions about a booking, a listing, or a driver application? Reach us on any of the channels
        below — we reply within one business day.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { icon: Mail, label: "Email", value: "support@nganyahire.co.ke" },
          { icon: Phone, label: "Phone / WhatsApp", value: "+254 700 000 000" },
          { icon: MapPin, label: "Office", value: "Nairobi, Kenya" },
        ].map((item) => (
          <Card key={item.label} className="border-border/50 bg-card/30">
            <CardContent className="p-6">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 border-border/50 bg-card/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-primary" /> Send a support request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="c-name" className="text-sm font-medium">Your name</label>
              <Input id="c-name" name="name" placeholder="Wanjiku Kamau" className="border-border/50 bg-background/50" />
            </div>
            <div className="space-y-2">
              <label htmlFor="c-email" className="text-sm font-medium">Email</label>
              <Input id="c-email" name="email" type="email" placeholder="you@example.com" className="border-border/50 bg-background/50" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="c-msg" className="text-sm font-medium">How can we help?</label>
              <textarea
                id="c-msg"
                name="message"
                rows={5}
                placeholder="Tell us about your booking or question…"
                className="w-full rounded-lg border border-border/50 bg-background/50 p-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="button" className="bg-primary font-bold text-primary-foreground" disabled>
                Email us directly
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                In-app support tickets are wired to the support table; until the mail provider is
                configured, please use the email address above.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
