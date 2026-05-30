"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const NAVBAR_HEIGHT = 70;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const { data: session, isPending: loading } = authClient.useSession();

  const navItems = [
    { label: "Quick Skin Analysis", href: "/analyse/upload" },
    { label: "Skincare Blogs", href: "/blog" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
  ];

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
  }

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 w-full border-b border-[#e5ddd4] bg-[#f5efe9] md:bg-[#f5efe9]/80 md:backdrop-blur-md z-50"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <div className="relative max-w-[1450px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[70px]">
            
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-tight">
              <span className="font-serif text-lg md:text-[34px] tracking-[0.2em] text-[#3B2E2A]">
                GLEMMA
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.35em] text-[#B89C7D]">
                SKINCARE INTELLIGENCE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center gap-10 text-[16px] tracking-wide text-[#5f534a]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-[#3B2E2A] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="h-9 w-24 bg-[#e5ddd4] animate-pulse rounded-md" />
              ) : session?.user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-[#3B2E2A] hover:underline"
                  >
                    {session.user.name}
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="text-sm px-3 py-2 rounded-md border border-[#3B2E2A] hover:bg-[#3B2E2A] hover:text-white transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="text-sm px-4 py-2 rounded-md bg-[#3B2E2A] text-white hover:bg-[#2a211e] transition"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              className="relative z-[60] md:hidden p-3 -mr-3 rounded-md hover:bg-accent transition"
            >
              {open ? (
                <X className="h-5 w-5 text-[#3B2E2A]" />
              ) : (
                <Menu className="h-5 w-5 text-[#3B2E2A]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="fixed inset-x-0 z-[999] flex flex-col bg-[#f5efe9] border-t border-[#e5ddd4] shadow-md md:hidden"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100dvh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div className="flex-1 overflow-y-auto px-6 py-6">
            
            {/* Nav */}
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-wide text-[#6f6259] hover:text-[#3B2E2A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth */}
            <div className="border-t border-[#e5ddd4] pt-4 mt-6">
              {loading ? (
                <div className="h-10 w-full bg-[#e5ddd4] animate-pulse rounded-md" />
              ) : session?.user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-[#3B2E2A]"
                  >
                    {session.user.name}
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="inline-flex w-full min-h-11 items-center justify-center rounded-full border border-[#3B2E2A] px-5 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full min-h-11 items-center justify-center rounded-full bg-[#3B2E2A] px-5 text-sm font-medium text-white"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}