"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          className='fixed bottom-8 right-8 h-10 w-10 rounded-full p-0 shadow-lg transition-opacity hover:opacity-90'
          onClick={scrollToTop}
        >
          <ArrowUpIcon className='h-5 w-5' />
          <span className='sr-only'>Scroll to top</span>
        </Button>
      )}
    </>
  );
}
