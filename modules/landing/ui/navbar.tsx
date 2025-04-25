"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, LockIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const pathName = usePathname();

  const handleSignout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPending) {
    return (
      <div className='fixed top-0 w-full z-50 transition-all duration-300 px-5 md:px-0'>
        <div className='container flex h-16 items-center justify-between mx-auto'>
          <Link href={"/"} className='flex items-center gap-2'>
            <LockIcon className='size-5 text-primary' />
            <span className='hidden md:block font-bold text-xl'>
              BetterAuthApplication
            </span>
          </Link>

          <div className='flex items-center gap-4'>
            <ModeToggle />
            <div>
              <div className='h-9 w-[94px] rounded-md bg-primary/10 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-5 md:px-0",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className='container flex h-16 items-center justify-between mx-auto'>
        <Link href={"/"} className='flex items-center gap-2'>
          <LockIcon className='size-5 text-primary' />
          <span className='hidden md:block font-bold text-xl'>
            BetterAuthApplication
          </span>
        </Link>

        <div className='flex items-center gap-4'>
          <ModeToggle />
          {!session ? (
            <Link href={"/sign-in"} className={cn(buttonVariants())}>
              Get started
            </Link>
          ) : (
            <div className='flex gap-2'>
              <Button onClick={handleSignout} variant={"destructive"}>
                Logout <LogOut />
              </Button>

              {pathName === "/" && (
                <Link href={"/home"} className={cn(buttonVariants())}>
                  Dashboard <ArrowRightIcon />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
