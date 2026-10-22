export const dynamic = "force-dynamic";

import { db } from "@/db";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const vehicles = await db.query.vehicles.findMany({
    with: {
      images: true,
    },
    where: (vehicles, { eq, and }) => {
      const conditions = [eq(vehicles.status, "active")];
      // Add more filters here based on searchParams
      return and(...conditions);
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Explore the Fleet</h1>
          <p className="mt-2 text-muted-foreground">Find the perfect ride for your next big event.</p>
        </div>
        <div className="flex w-full items-center space-x-2 md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 border-border/50 bg-card/30"
              placeholder="Search by name or area..."
            />
          </div>
          <Button variant="outline" className="border-border/50">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle as any} />
        ))}
        {vehicles.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold">No nganyas found.</p>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
