import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Camera,
  TrendingUp,
  ArrowRight,
  User,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";
// import UpgradePlanCard from "./_components/upgrade-plan-card";
// import { DeleteAccountButton } from "@/components/dashboard/deleteAccountButton";
import { AccountManagement } from "@/components/dashboard/AccountManagement";
import { getUserTier } from "@/lib/get-tier";
import TierCard from "@/components/dashboard/TierCard";


const quickActions = [
  {
    title: "New Skin Analysis",
    description: "Upload a photo and get your personalized skincare routine",
    icon: Camera,
    href: "/analyse/upload",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "View Past Results",
    description: "Review your previous analysis and track changes",
    icon: TrendingUp,
    href: "/analyse/results",
    color: "bg-blue-500/10 text-blue-500",
  },

  // TODO: handled dynamically based on user plan
  // {
  //   title: "Upgrade Plan",
  //   description: "Unlock unlimited analysis and AI-generated routines",
  //   icon: Sparkles,
  //   href: "/pricing",
  //   color: "bg-purple-500/10 text-purple-500",
  // },
  //
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  // Resolve the user's subscription tier from Polar
  const tier = await getUserTier(user.id);

  const glowProductId = process.env.POLAR_PRODUCT_GLOW_ID ?? "";
  const glowProProductId = process.env.POLAR_PRODUCT_GLOW_PRO_ID ?? "";

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground text-base">
            Manage your skin analysis and track your progress
          </p>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Tier Card */}
        <TierCard tier={tier} />

        {/* Get Complete Skincare CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3B2E2A] to-[#5a4540] text-white p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(191,144,138,0.3),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#bf908a]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#e8c4bf]" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-1">
                  Get complete skincare
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  Upload a photo and get your full AI-powered skin analysis with personalized routines and product recommendations.
                </p>
              </div>
            </div>
            <Link
              href="/analyse/1/"
              className="inline-flex items-center gap-2 rounded-full bg-[#bf908a] hover:bg-[#a67d78] text-white px-6 py-3 text-sm font-medium transition-colors flex-shrink-0"
            >
              Get complete skincare
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your billing or delete your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountManagement /> {/* Use the existing component */}
        </CardContent>
      </Card>
      

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="h-full hover:border-foreground/20 hover:shadow-sm transition-all cursor-pointer">
                  <CardHeader>
                    <div
                      className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}
                    >
                      <action.icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Go to {action.title.toLowerCase()}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {/* <UpgradePlanCard
              glowProductId={glowProductId}
              glowProProductId={glowProProductId}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
