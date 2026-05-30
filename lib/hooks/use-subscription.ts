"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export type Tier = "free" | "glow" | "glow_pro";

/**
 * Client-side hook to resolve the user's subscription tier from Dodo Payments.
 * Uses authClient.dodopayments.customer.subscriptions.list() to return active subscriptions.
 *
 * Usage:
 *   const { tier, isLoading } = useSubscription();
 *   {tier !== "free" && <WeeklyRoutine />}
 *   {tier === "glow_pro" && <LifestyleEngine />}
 */
export function useSubscription() {
  const [tier, setTier] = useState<Tier>("free");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    // No user = free tier
    if (!session?.user) {
      setTier("free");
      setIsLoading(false);
      return;
    }

    // Default to the tier already cached in the session/user record
    const sessionTier = (session.user as any).subscriptionTier;
    if (sessionTier && ["free", "glow", "glow_pro"].includes(sessionTier)) {
      setTier(sessionTier as Tier);
    }

    const fetchTier = async () => {
      try {
        const res = await authClient.dodopayments.customer.subscriptions.list({
          query: {
            status: "active",
            limit: 50,
          },
        });

        const activeSubs = res?.data?.items || [];
        if (!activeSubs.length) {
          setTier("free");
          return;
        }

        // Dodo Product IDs from env or known fallbacks
        const glowProId = process.env.NEXT_PUBLIC_DODO_PRODUCT_GLOW_PRO_ID || 
                          process.env.DODO_PRODUCT_GLOW_PRO_ID || 
                          "pdt_0NfyWiyTcBdjoinqFzxlg";
        const glowId = process.env.NEXT_PUBLIC_DODO_PRODUCT_GLOW_ID || 
                       process.env.DODO_PRODUCT_GLOW_ID || 
                       "pdt_0NfyWew9yKOqJiMiQ9Feg";

        for (const sub of activeSubs) {
          if (sub.product_id === glowProId) {
            setTier("glow_pro");
            return;
          }
          if (sub.product_id === glowId) {
            setTier("glow");
            return;
          }
        }

        setTier("free");
      } catch (error) {
        console.error("Error fetching subscription state from Dodo:", error);
        // On error, keep using the session tier
      } finally {
        setIsLoading(false);
      }
    };

    fetchTier();
  }, [session?.user]);

  return { tier, isLoading };
}
