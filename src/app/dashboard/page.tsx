export const dynamic = "force-dynamic";

import { db } from "@/db";
import { auth } from "@/auth";
import { bookings, customerProfiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Calendar, MapPin, Car, CheckCircle2, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  awaiting_driver: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  awaiting_owner: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  approved: "bg-green-500/20 text-green-400 border-green-500/40",
  rejected: "bg-red-500/20 text-red-400 border-red-500/40",
  cancelled: "bg-muted text-muted-foreground border-border",
  completed: "bg-accent/20 text-accent border-accent/40",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending review",
  awaiting_driver: "Awaiting driver confirmation",
  awaiting_owner: "Awaiting owner approval",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
  completed: "Completed",
};

export default async function CustomerDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const profile = await db.query.customerProfiles.findFirst({
    where: eq(customerProfiles.userId, session.user.id),
  });

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Profile not set up</h1>
        <p className="mt-2 text-muted-foreground">
          Your customer profile could not be found. Please contact support.
        </p>
      </div>
    );
  }

  const myBookings = await db.query.bookings.findMany({
    where: eq(bookings.customerId, profile.id),
    orderBy: [desc(bookings.createdAt)],
    with: {
      vehicleId: { with: { images: true } },
      driverId: { with: { user: true } },
    },
  });

  const now = new Date();
  const upcoming = myBookings.filter(
    (b) =>
      new Date(b.endDate) >= now &&
      b.status !== "cancelled" &&
      b.status !== "rejected" &&
      b.status !== "completed"
  );
  const past = myBookings.filter(
    (b) =>
      new Date(b.endDate) < now ||
      b.status === "cancelled" ||
      b.status === "rejected" ||
      b.status === "completed"
  );

  const renderBooking = (booking: (typeof myBookings)[number]) => {
    const vehicle = booking.vehicleId as any;
    const mainImage = vehicle?.images?.find((i: any) => i.isMain)?.url || vehicle?.images?.[0]?.url;
    const driverName = (booking.driverId as any)?.user?.name;

    return (
      <Card key={booking.id} className="overflow-hidden border-border/50 bg-card/30">
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-32">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage} alt={vehicle?.name || "Nganya"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <Car className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold">{vehicle?.name || "Listing removed"}</h3>
                <Badge className={STATUS_STYLES[booking.status] || "border-border"}>
                  {STATUS_LABELS[booking.status] || booking.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4 text-primary" />
                  {format(new Date(booking.startDate), "PPP")}
                </span>
                <span className="inline-flex items-center">
                  <MapPin className="mr-1.5 h-4 w-4 text-primary" />
                  {booking.pickupLocation}
                </span>
                {driverName && (
                  <span className="inline-flex items-center">
                    <Car className="mr-1.5 h-4 w-4 text-primary" />
                    {driverName}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-primary">
                KSh {parseFloat(booking.totalPrice).toLocaleString()}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  Ref: {booking.id.slice(0, 8).toUpperCase()}
                </span>
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={`/nganya/${booking.vehicleId ? (booking.vehicleId as any).id : ""}`}
                className={buttonVariants({ variant: "outline", className: "border-primary/30" })}
              >
                View Nganya
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Karibu, {session.user.name?.split(" ")[0] || "Rider"}
          </h1>
          <p className="text-muted-foreground">Track your hire requests and booking history.</p>
        </div>
        <Link href="/browse" className={buttonVariants({ className: "bg-primary font-bold text-primary-foreground" })}>
          Book another nganya
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total requests", value: myBookings.length, icon: Clock },
          { label: "Upcoming", value: upcoming.length, icon: CheckCircle2 },
          {
            label: "Completed",
            value: myBookings.filter((b) => b.status === "completed").length,
            icon: XCircle,
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming bookings</h2>
        {upcoming.length > 0 ? (
          upcoming.map(renderBooking)
        ) : (
          <Card className="border-dashed border-border/60 bg-transparent">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Car className="h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No upcoming bookings yet.</p>
              <p className="text-sm text-muted-foreground">
                Browse the fleet and request a nganya for your next event.
              </p>
              <Link href="/browse" className={buttonVariants({ className: "mt-2 bg-primary font-bold text-primary-foreground" })}>
                Explore Nganyas
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">Booking history</h2>
          {past.map(renderBooking)}
        </section>
      )}
    </div>
  );
}
