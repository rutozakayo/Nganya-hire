import { Hero } from "@/components/hero";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Music, Tv, ShieldCheck, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FEATURED_NGANYAS = [
  {
    id: "1",
    name: "MATATA KING",
    reg: "KDL 123X",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    price: "15,000",
    capacity: 14,
    area: "Nairobi CBD / Embakasi",
    features: ["VIP Sound", "LED Screens", "Custom Graffiti"],
  },
  {
    id: "2",
    name: "CHAMPION",
    reg: "KDM 456Y",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
    price: "20,000",
    capacity: 29,
    area: "Westlands / Ngong Road",
    features: ["PS5", "Party Lights", "High Fidelity Sound"],
  },
  {
    id: "3",
    name: "PHANTOM",
    reg: "KDN 789Z",
    image: "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?auto=format&fit=crop&q=80&w=800",
    price: "12,000",
    capacity: 14,
    area: "Rongai / Karen",
    features: ["Luxury Leather", "Ambient Lighting"],
  },
];

const CATEGORIES = [
  { name: "Weddings", icon: Users, color: "text-primary" },
  { name: "Parties", icon: Music, icon2: Tv, color: "text-secondary" },
  { name: "Music Videos", icon: Tv, color: "text-accent" },
  { name: "Road Trips", icon: MapPin, color: "text-primary" },
];

export default function Home() {
  return (
    <div className="flex flex-col space-y-20 pb-20">
      <Hero />

      {/* Featured Nganyas */}
      <section className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Nganyas</h2>
            <p className="mt-2 text-muted-foreground">The most popular rides in the city right now.</p>
          </div>
          <Link href="/browse" className={buttonVariants({ variant: "link", className: "text-primary" })}>
            View all vehicles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURED_NGANYAS.map((nganya) => (
            <Card key={nganya.id} className="group overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:border-primary/50">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={nganya.image}
                  alt={nganya.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute right-4 top-4 bg-primary/80 text-primary-foreground backdrop-blur-md">
                  KSh {nganya.price}/day
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{nganya.name}</CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="mr-1 h-3 w-3 fill-accent text-accent" />
                    4.9 (24 reviews)
                  </div>
                </div>
                <p className="text-xs font-mono text-muted-foreground">{nganya.reg}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {nganya.features.map((f) => (
                    <Badge key={f} variant="outline" className="border-border/50 text-[10px]">
                      {f}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {nganya.capacity} passengers
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {nganya.area.split(" / ")[0]}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Link href={`/nganya/${nganya.id}`} className={buttonVariants({ variant: "outline", className: "flex-1 border-primary/20 hover:bg-primary/10" })}>
                  Details
                </Link>
                <Link href={`/nganya/${nganya.id}`} className={buttonVariants({ className: "flex-1 bg-primary text-primary-foreground hover:brightness-110" })}>
                  Book Now
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-card/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Booking Categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/browse?category=${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center justify-center space-y-4 rounded-2xl border border-border/50 bg-background/50 p-8 transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(0,242,255,0.15)]"
              >
                <cat.icon className={`h-12 w-12 transition-transform group-hover:scale-110 ${cat.color}`} />
                <span className="font-bold">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight">How to Book</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            { step: "01", title: "Search", desc: "Browse our catalogue and find the nganya that fits your vibe and group size." },
            { step: "02", title: "Check Availability", desc: "Select your dates and get real-time confirmation from the driver." },
            { step: "03", title: "Confirm & Ride", desc: "Approve the booking, settle the deposit, and prepare for an epic experience." },
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <span className="mb-4 inline-block text-6xl font-black text-primary/10">{item.step}</span>
              <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-primary/20 via-background to-secondary/20 p-8 md:p-12 border border-border/50">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="mb-4 text-3xl font-bold">Verified Drivers & Vehicles</h2>
              <p className="text-muted-foreground">
                Every nganya on our platform undergoes a safety check, and every driver is verified with their NTSA license and experience records. Your safety and experience are our priority.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="text-xl font-bold tracking-tight">NGANYA SAFE™</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
