import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className='my-8 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-10'>
      <p className='text-sm text-muted-foreground text-center md:text-left'>
        © 2025 BetterAuthApplication. All rights reserved.
      </p>
      <p className='flex justify-center text-sm text-muted-foreground text-center md:text-left'>
        Built by{" "}
        <a
          target='_blank'
          href='https://www.harshitpatel.dev/'
          className='mx-1 hover:underline'
        >
          Harshit Patel
        </a>{" "}
        with Love <Heart className='size-4 fill-rose-400' />
      </p>
      <p className='flex justify-center text-sm text-muted-foreground text-center md:text-left'>
        <a
          target='_blank'
          href='https://github.com/hsp2810/BetterauthImplementation'
          className='mx-1 hover:underline flex gap-1 items-center'
        >
          <Github className='size-4' />
          Source code
        </a>
      </p>
    </footer>
  );
}
