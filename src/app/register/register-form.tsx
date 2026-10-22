"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { registerAction, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
        <Input id="name" name="name" placeholder="Wanjiku Kamau" autoComplete="name" required
          className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required
          className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input id="password" name="password" type="password" placeholder="At least 8 characters"
          autoComplete="new-password" required className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••"
          autoComplete="new-password" required className="border-border/50 bg-background/50" />
      </div>

      {state.error && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending}
        className="h-12 w-full bg-primary font-bold text-primary-foreground">
        {isPending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…</>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
}
