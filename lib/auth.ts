import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import {
  dodopayments,
  checkout,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";
import { nextCookies } from "better-auth/next-js";
import { user as userTable } from "@/lib/schemas/auth-schema";
import { eq, or } from "drizzle-orm";

// Load environment variables from .env file for glemma --> dodo redirections
const appUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Initialize DodoPayments client
const dodoPayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as any) || "test_mode",
});

// Map Dodo product IDs → internal tier names
const productIdToTier: Record<string, string> = {
  [process.env.DODO_PRODUCT_GLOW_ID!]: "glow",
  [process.env.DODO_PRODUCT_GLOW_PRO_ID!]: "glow_pro",
};

export const auth = betterAuth({
  // db
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),

  // authentication method: 1
  emailAndPassword: {
    enabled: false, //!currently disabled
  },

  // authentication method: 2
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // session management
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 min
    },
  },

  // user fields mapping and hooks
  user: {
    additionalFields: {
      subscriptionTier: {
        type: "string",
        defaultValue: "free",
      },
      subscriptionStatus: {
        type: "string",
        defaultValue: "inactive",
      },
      dodoCustomerId: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [
    // Next.js cookies plugin to read cookies in server components and API routes
    nextCookies(),

    // Dodo Payments plugin for subscription management and billing
    dodopayments({
      client: dodoPayments,
      createCustomerOnSignUp: true,
      getCustomerParams: (user) => ({
        metadata: { userId: user.id },
      }),
      use: [
        checkout({
          products: [
            { productId: process.env.DODO_PRODUCT_GLOW_ID!, slug: "glow" },
            {
              productId: process.env.DODO_PRODUCT_GLOW_PRO_ID!,
              slug: "glow-pro",
            },
          ],
          successUrl: `${appUrl}/dashboard`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
          onSubscriptionActive: async (payload) => {
            const customerId = payload.data.customer.customer_id;
            const email = payload.data.customer.email;
            const productId = payload.data.product_id;
            const tier = productIdToTier[productId] ?? "free";

            await db
              .update(userTable)
              .set({
                subscriptionTier: tier,
                subscriptionStatus: "active",
                dodoCustomerId: customerId,
              })
              .where(
                or(
                  eq(userTable.dodoCustomerId, customerId),
                  eq(userTable.email, email)
                )
              );

            console.log(
              `[Webhook] subscription.active → user ${email} → tier: ${tier}`
            );
          },
          onSubscriptionCancelled: async (payload) => {
            const customerId = payload.data.customer.customer_id;
            const email = payload.data.customer.email;

            await db
              .update(userTable)
              .set({
                subscriptionTier: "free",
                subscriptionStatus: "inactive",
              })
              .where(
                or(
                  eq(userTable.dodoCustomerId, customerId),
                  eq(userTable.email, email)
                )
              );

            console.log(
              `[Webhook] subscription.cancelled → user ${email} → reset to free`
            );
          },
          onSubscriptionExpired: async (payload) => {
            const customerId = payload.data.customer.customer_id;
            const email = payload.data.customer.email;

            await db
              .update(userTable)
              .set({
                subscriptionTier: "free",
                subscriptionStatus: "inactive",
              })
              .where(
                or(
                  eq(userTable.dodoCustomerId, customerId),
                  eq(userTable.email, email)
                )
              );

            console.log(
              `[Webhook] subscription.expired → user ${email} → reset to free`
            );
          },
          onSubscriptionUpdated: async (payload) => {
            const customerId = payload.data.customer.customer_id;
            const email = payload.data.customer.email;
            const productId = payload.data.product_id;
            const status = payload.data.status;

            const tier = productIdToTier[productId] ?? "free";
            const activeStatus = status === "active" ? "active" : "inactive";
            const actualTier = activeStatus === "active" ? tier : "free";

            await db
              .update(userTable)
              .set({
                subscriptionTier: actualTier,
                subscriptionStatus: activeStatus,
                dodoCustomerId: customerId,
              })
              .where(
                or(
                  eq(userTable.dodoCustomerId, customerId),
                  eq(userTable.email, email)
                )
              );

            console.log(
              `[Webhook] subscription.updated → user ${email} → tier: ${actualTier}, status: ${activeStatus}`
            );
          },
        }),
      ],
    }),
  ],
});
