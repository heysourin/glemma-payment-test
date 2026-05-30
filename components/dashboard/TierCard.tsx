import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  Zap,
  Check,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Infinity as InfinityIcon,
} from "lucide-react";
import type { Tier } from "@/lib/get-tier";

/* ─────────────── tier display config ─────────────── */

const TIER_DISPLAY: Record<
  Tier,
  {
    label: string;
    icon: typeof Crown;
    gradient: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
    description: string;
    highlights: string[];
    analysisLimit: string;
  }
> = {
  free: {
    label: "Free",
    icon: Zap,
    gradient: "from-slate-100 to-slate-50",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-600",
    borderColor: "border-slate-200",
    description: "You're on the starter plan — enough to understand your skin.",
    highlights: [
      "Skin type detection",
      "Basic concern identification",
      "Generic product suggestions",
    ],
    analysisLimit: "1 analysis / month",
  },
  glow: {
    label: "Glow",
    icon: Sparkles,
    gradient: "from-amber-50 to-orange-50",
    badgeBg: "bg-[#f2e7e5]",
    badgeText: "text-[#bf908a]",
    borderColor: "border-[#e5ddd4]",
    description: "Your skin is tracked. Routines adapt weekly.",
    highlights: [
      "3× analysis per week",
      "Personalized product recs",
      "Weekly progress tracking",
      "AI-guided routine",
    ],
    analysisLimit: "3 analyses / week",
  },
  glow_pro: {
    label: "Glow Pro",
    icon: Crown,
    gradient: "from-[#f2e7e5] to-[#f5efe9]",
    badgeBg: "bg-[#bf908a]",
    badgeText: "text-white",
    borderColor: "border-[#bf908a]/40",
    description:
      "Full power unlocked — your skin intelligence engine is running.",
    highlights: [
      "Unlimited analysis",
      "Daily adaptive routine",
      "Lifestyle engine",
      "Product audit & conflict detection",
      "Breakout prediction",
    ],
    analysisLimit: "Unlimited",
  },
};

/* ─────────────── component ─────────────── */

export default function TierCard({ tier }: { tier: Tier }) {
  const config = TIER_DISPLAY[tier];
  const Icon = config.icon;
  const isTopTier = tier === "glow_pro";

  return (
    <Card
      className={`relative overflow-hidden ${config.borderColor} transition-all`}
    >
      {/* Subtle gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-60 pointer-events-none`}
      />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon container */}
            <div
              className={`w-11 h-11 rounded-xl ${config.badgeBg} flex items-center justify-center`}
            >
              <Icon className={`w-5 h-5 ${config.badgeText}`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Your Plan</CardTitle>
                <span
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full ${config.badgeBg} ${config.badgeText}`}
                >
                  {config.label}
                </span>
              </div>
              <CardDescription className="mt-0.5">
                {config.description}
              </CardDescription>
            </div>
          </div>

          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          {/* Feature highlights */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              What&apos;s included
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {config.highlights.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                >
                  <Check className="w-3.5 h-3.5 text-[#bf908a] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Usage counter + CTA */}
          <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[180px]">
            <div className="flex items-center gap-2 text-sm">
              {tier === "glow_pro" ? (
                <InfinityIcon className="w-4 h-4 text-[#bf908a]" />
              ) : (
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-muted-foreground">
                {config.analysisLimit}
              </span>
            </div>

            {!isTopTier && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#bf908a] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#a87d78] transition-colors"
              >
                Upgrade plan
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {isTopTier && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#bf908a] font-medium">
                <Crown className="w-3.5 h-3.5" />
                You&apos;re on the best plan
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
