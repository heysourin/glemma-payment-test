import DodoPayments from "dodopayments";
import { db } from "@/lib/db";
import { user as userTable } from "@/lib/schemas/auth-schema";
import { eq } from "drizzle-orm";

const dodoPayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as any) || "test_mode",
});

export type Tier = "free" | "glow" | "glow_pro";

export const TIER_CONFIG = {
  free: {
    analysisPerMonth: 1,
    recommendations: "generic",
    routine: false,
    tracking: false,
    lifestyle: false,
    audit: false,
  },
  glow: {
    analysisPerWeek: 3,
    recommendations: "specific",
    routine: "basic",
    tracking: true,
    lifestyle: false,
    audit: false,
  },
  glow_pro: {
    analysisPerWeek: Infinity,
    recommendations: "specific",
    routine: "full",
    tracking: true,
    lifestyle: true,
    audit: true,
  },
} as const;

/**
 * Resolves user's tier by checking their active Dodo Payments subscriptions,
 * then syncs the result back to the database.
 *
 * This "sync-on-read" pattern ensures the DB stays up-to-date even if
 * Dodo webhooks can't reach the server (e.g. localhost / sandbox).
 *
 * Call this server-side only (API routes, server components).
 */
export async function getUserTier(userId: string): Promise<Tier> {
  let tier: Tier = "free";
  let hasActiveSubscription = false;

  try {
    // 1. Get customer details from local user table
    const [dbUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (dbUser) {
      let customerId = dbUser.dodoCustomerId;

      // 2. If customerId isn't stored locally, try to find it on Dodo by email
      if (!customerId) {
        const customers = await dodoPayments.customers.list({
          email: dbUser.email,
        });
        const existingCustomer = customers.items?.[0];
        if (existingCustomer) {
          customerId = existingCustomer.customer_id;
          // Store it so we don't query Dodo customer search again
          await db
            .update(userTable)
            .set({ dodoCustomerId: customerId })
            .where(eq(userTable.id, userId));
        }
      }

      // 3. Query active subscriptions from Dodo
      if (customerId) {
        const subscriptions = await dodoPayments.subscriptions.list({
          customer_id: customerId,
          status: "active",
        });

        if (subscriptions.items?.length) {
          const glowProProductId = process.env.DODO_PRODUCT_GLOW_PRO_ID;
          const glowProductId = process.env.DODO_PRODUCT_GLOW_ID;

          for (const sub of subscriptions.items) {
            if (sub.product_id === glowProProductId) {
              tier = "glow_pro";
              hasActiveSubscription = true;
              break;
            }
            if (sub.product_id === glowProductId) {
              tier = "glow";
              hasActiveSubscription = true;
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error resolving user tier from Dodo Payments:", error);
    // On failure, fall back to whatever the DB already has
    try {
      const [dbUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId));
      if (dbUser) {
        return dbUser.subscriptionTier as Tier;
      }
    } catch {}
    return tier;
  }

  // Sync the resolved tier back into the database
  try {
    await db
      .update(userTable)
      .set({
        subscriptionTier: tier,
        subscriptionStatus: hasActiveSubscription ? "active" : "inactive",
      })
      .where(eq(userTable.id, userId));
  } catch (dbError) {
    // Non-fatal — log but don't break the user experience
    console.error("Error syncing tier to DB:", dbError);
  }

  return tier;
}
