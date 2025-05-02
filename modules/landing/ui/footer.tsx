import {
  Facebook,
  Github,
  Heart,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className='my-8 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-10'>
      <div className='flex justify-center space-x-4'>
        <a
          href='#'
          className='text-muted-foreground hover:text-purple-400 transition-colors'
        >
          <Instagram className='h-5 w-5' />
        </a>
        <a
          href='#'
          className='text-muted-foreground hover:text-purple-400 transition-colors'
        >
          <Twitter className='h-5 w-5' />
        </a>
        <a
          href='#'
          className='text-muted-foreground hover:text-purple-400 transition-colors'
        >
          <Facebook className='h-5 w-5' />
        </a>
        <a
          href='#'
          className='text-muted-foreground hover:text-purple-400 transition-colors'
        >
          <Youtube className='h-5 w-5' />
        </a>
      </div>
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
      <p className='text-sm text-muted-foreground text-center md:text-left'>
        © 2025 BetterAuthApplication. All rights reserved.
      </p>
    </footer>
  );
}
