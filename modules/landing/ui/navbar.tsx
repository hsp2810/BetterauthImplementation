"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Camera className='h-8 w-8' />
          <span className='font-bold text-2xl'>Snapiq</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8'>
          <Link
            href='#features'
            className='text-foreground/80 hover:text-foreground transition-colors'
          >
            Features
          </Link>
          <Link
            href='#community'
            className='text-foreground/80 hover:text-foreground transition-colors'
          >
            Community
          </Link>
          <Link
            href='#download'
            className='text-foreground/80 hover:text-foreground transition-colors'
          >
            Download
          </Link>
          <div className='flex items-center gap-4 ml-4'>
            <Button variant='outline' size='sm'>
              Log in
            </Button>
            <Button size='sm'>Sign up</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-foreground p-2'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-background/95 backdrop-blur-md'
          >
            <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
              <Link
                href='#features'
                className='py-3 px-4 hover:bg-accent rounded-md transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href='#community'
                className='py-3 px-4 hover:bg-accent rounded-md transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href='#download'
                className='py-3 px-4 hover:bg-accent rounded-md transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Download
              </Link>
              <div className='flex flex-col gap-3 mt-2'>
                <Link
                  href={"/sign-in"}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full"
                  )}
                >
                  Log in
                </Link>
                <Link
                  href={"/sign-in"}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full"
                  )}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
