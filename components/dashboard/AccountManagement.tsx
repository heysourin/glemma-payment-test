"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AccountManagement() {
  const router = useRouter();

  const handleOpenPortal = async () => {
    const res = await authClient.dodopayments.customer.portal();
    if (res?.data?.url) {
      window.location.href = res.data.url;
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await authClient.deleteUser({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
            },
        },
      });
    }
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleOpenPortal} variant="outline">
        Manage Billing
      </Button>
      <Button onClick={handleDeleteAccount} variant="destructive">
        Delete Account
      </Button>
    </div>
  );
}


