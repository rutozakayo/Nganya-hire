import { db } from "@/db";
import { vehicles, vehicleImages, driverProfiles, users, vehicleDrivers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Music, Tv, Calendar, ShieldCheck, Star, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { BookingForm } from "./booking-form";

export default async function NganyaDetailsPage({ params }: { params: { id: string } }) {
  const vehicle = await db.query.vehicles.findFirst({
    where: eq(vehicles.id, params.id),
    with: {
      images: true,
      owner: true,
    },
  });

  if (!vehicle) notFound();

  const assignedDriverRecord = await db.query.vehicleDrivers.findFirst({
    where: eq(vehicleDrivers.vehicleId, vehicle.id),
  });

  const driverId = assignedDriverRecord?.driverId;
  const driver = driverId ? await db.query.driverProfiles.findFirst({
    where: eq(driverProfiles.id, driverId),
    with: { user: true }
  }) : null;

  const features = typeof vehicle.features === "string" ? JSON.parse(vehicle.features) : vehicle.features || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: Images & Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {vehicle.images.map((img, idx) => (
              <div 
                key={img.id} 
                className={`relative overflow-hidden rounded-2xl border border-border/50 ${idx === 0 ? "col-span-2 aspect-[21/9]" : "aspect-square"}`}
              >
                <img src={img.url} alt={vehicle.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-extrabold tracking-tight">{vehicle.name}</h1>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="text-lg font-bold">4.9</span>
                <span className="text-muted-foreground">(24 reviews)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /> {vehicle.operatingArea}</div>
              <div className="flex items-center"><Users className="mr-2 h-4 w-4 text-primary" /> {vehicle.capacity} Passengers</div>
              <div className="flex items-center font-mono uppercase tracking-wider bg-muted px-2 py-0.5 rounded text-[10px]">{vehicle.registrationNumber}</div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About this Nganya</h2>
            <p className="text-muted-foreground leading-relaxed">
              {vehicle.description || "Experience Nairobi's urban energy with this custom-built masterpiece. Featuring top-of-the-line sound systems, vibrant graffiti art, and premium interior lighting, this nganya is perfect for making a statement at your next event."}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {features.map((feature: string) => (
                <div key={feature} className="flex items-center p-4 rounded-xl border border-border/50 bg-card/30">
                  <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
                    {feature.toLowerCase().includes("sound") ? <Music className="h-5 w-5" /> : <Tv className="h-5 w-5" />}
                  </div>
                  <span className="font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {driver && (
            <Card className="border-border/50 bg-card/30">
              <CardHeader>
                <CardTitle className="text-xl">Assigned Driver</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-6">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary">
                  <img src={driver.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=driver"} alt={driver.user.name || ""} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">{driver.user.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>Verified Professional Driver</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{driver.experienceYears} years experience • {driver.bio || "Safe and reliable."}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28 border-primary/20 bg-card/50 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-primary">KSh {parseFloat(vehicle.basePrice).toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">per event / day</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <BookingForm 
                vehicleId={vehicle.id} 
                driverId={driver?.id} 
              />
            </CardContent>
            <Separator className="bg-border/50" />
            <div className="p-6">
              <p className="text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                No payment required yet
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
