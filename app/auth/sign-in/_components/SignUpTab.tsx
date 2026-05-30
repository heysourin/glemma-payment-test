"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignUpTab = () => {
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }



  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full h-11 text-sm font-medium rounded-xl bg-white text-[#3B2E2A] flex items-center justify-center gap-2 transition hover:cursor-pointer hover:bg-[#bf908a]"
      >
        {/* Google Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.88-6.88C35.68 2.38 30.2 0 24 0 14.64 0 6.56 5.38 2.56 13.22l8.06 6.26C12.5 13.2 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.1 24.5c0-1.64-.14-3.22-.4-4.75H24v9h12.4c-.54 2.9-2.18 5.36-4.64 7l7.18 5.58c4.18-3.86 6.56-9.54 6.56-16.83z"/>
          <path fill="#FBBC05" d="M10.62 28.48A14.47 14.47 0 019.5 24c0-1.56.26-3.06.72-4.48l-8.06-6.26A23.94 23.94 0 000 24c0 3.9.94 7.58 2.6 10.74l8.02-6.26z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.18-5.58c-2 1.34-4.56 2.14-8.72 2.14-6.26 0-11.5-3.7-13.38-9.02l-8.02 6.26C6.56 42.62 14.64 48 24 48z"/>
        </svg>
        Continue with Google
      </Button>
    </div>
  );
};

export default SignUpTab;
