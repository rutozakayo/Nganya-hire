"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, HelpCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { checkAvailability, submitBooking } from "./actions";

export function BookingForm({ vehicleId, driverId }: { vehicleId: string; driverId: string | undefined }) {
  const [date, setDate] = useState<Date>();
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<"available" | "unavailable" | "pending" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!selectedDate || !driverId) return;

    setIsChecking(true);
    setAvailabilityStatus(null);
    try {
      const res = await checkAvailability(vehicleId, driverId, selectedDate);
      setAvailabilityStatus(res.status as any);
    } catch (error) {
      console.error(error);
      setAvailabilityStatus(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleBooking = async () => {
    if (!date) return;
    setIsSubmitting(true);
    try {
      const res = await submitBooking({
        vehicleId,
        driverId: driverId!,
        date,
        pickupLocation: "User Input Placeholder", // This should be a form field
        destination: "User Input Placeholder",
      });
      if (res.success) {
        alert("Booking request submitted!");
      } else {
        alert(res.error || "Failed to submit booking.");
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-semibold">Select Event Date</label>
        <Popover>
          <PopoverTrigger>
            <div
              className={cn(
                "flex w-full cursor-pointer items-center justify-start text-left font-normal h-12 border border-border/50 bg-background/50 rounded-lg px-4",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {date && (
        <div className="rounded-xl border border-border/50 bg-background/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Driver Availability</span>
            {isChecking ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <div className="flex items-center space-x-2">
                {availabilityStatus === "available" && (
                  <>
                    <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Confirmed</span>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </>
                )}
                {availabilityStatus === "unavailable" && (
                  <>
                    <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Unavailable</span>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </>
                )}
                {availabilityStatus === "pending" && (
                  <>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">Awaiting Confirmation</span>
                    <HelpCircle className="h-5 w-5 text-yellow-500" />
                  </>
                )}
                {!availabilityStatus && !isChecking && (
                  <span className="text-xs text-muted-foreground">Select a date</span>
                )}
              </div>
            )}
          </div>
          {availabilityStatus === "unavailable" && (
            <p className="mt-2 text-xs text-red-400">
              The driver is not available on this date. Please choose another date or nganya.
            </p>
          )}
        </div>
      )}

      <Button
        className="w-full h-14 bg-primary text-primary-foreground text-lg font-bold hover:brightness-110 shadow-[0_0_20px_rgba(0,242,255,0.2)]"
        disabled={!date || availabilityStatus === "unavailable" || isSubmitting || isChecking}
        onClick={handleBooking}
      >
        {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        Submit Booking Request
      </Button>
    </div>
  );
}
