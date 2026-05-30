import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignInTab from "./_components/SignInTab";
import SignUpTab from "./_components/SignUpTab";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative py-56 flex items-center justify-center px-4 bg-gradient-to-b from-white to-neutral-100">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(184,156,125,0.25),transparent_60%)]" />

      {/* Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif tracking-tight">Glemma</h1>
          <p className="text-sm text-muted-foreground mt-2">
            AI-powered skin analysis in under 30 seconds
          </p>
        </div>

        {/* Card */}
        <Card className="relative shadow-xl rounded-2xl border border-neutral-200 bg-[#3B2E2A]/90 backdrop-blur">
          {/* Card Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(184,156,125,0.25),transparent_60%)]" />

          <CardHeader className="pb-2" />

          <CardContent className="relative z-10">
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-neutral-100 p-1">
                <TabsTrigger
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-[#bf908a]"
                >
                  Get Started
                </TabsTrigger>

                <TabsTrigger
                  value="signin"
                  className="rounded-lg data-[state=active]:bg-[#bf908a]"
                >
                  Sign In
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="mt-6">
                <SignUpTab />
              </TabsContent>

              <TabsContent value="signin" className="mt-6">
                <SignInTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          Trusted by users for personalized skincare routines
        </p>
      </div>
    </div>
  );
}
