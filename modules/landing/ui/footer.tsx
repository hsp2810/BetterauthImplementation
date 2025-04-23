import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className='my-8 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-10'>
      <p className='text-xs text-muted-foreground text-center md:text-left'>
        © 2025 BetterAuthApplication. All rights reserved.
      </p>
      <p className='flex justify-center text-xs text-muted-foreground text-center md:text-left'>
        Built with{" "}
        <a
          target='_blank'
          href='https://www.harshitpatel.dev/'
          className='mx-1 hover:underline'
        >
          Harshit Patel
        </a>{" "}
        with Love <Heart className='size-4 fill-rose-400' />
      </p>
    </footer>
  );
}
