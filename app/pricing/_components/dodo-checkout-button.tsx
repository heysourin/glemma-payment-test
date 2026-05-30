"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  slug: "glow" | "glow-pro";
  label: string;
  featured?: boolean;
};

export default function DodoCheckoutButton({ slug, label, featured }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const handleCheckout = async () => {
    if (!session?.user) {
      toast.info("Please sign in to continue");
      router.push("/auth/sign-in");
      return;
    }

    try {
      setLoading(true);
      const res = await authClient.dodopayments.checkout({
        slug,
      });

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm text-center transition ${
        featured
          ? "bg-[#bf908a] text-white hover:bg-[#a67d78]"
          : "border border-[#e5ddd4] bg-transparent text-[#3B2E2A] hover:bg-[#efe3e1]"
      }`}
    >
      {loading ? "Redirecting..." : label}
    </Button>
  );
}
