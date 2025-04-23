import Link from "next/link";
import { LockIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className='border-t py-12 md:py-16 w-full'>
      <div className='container px-4 md:px-6 mx-auto'>
        <div className='grid gap-8 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <LockIcon className='h-6 w-6 text-primary' />
              <span className='font-bold text-xl'>BetterAuth</span>
            </div>
            <p className='max-w-xs text-sm text-muted-foreground'>
              Secure, flexible, and developer-friendly authentication using
              Drizzle, Neon, Zod, and tRPC.
            </p>
            <div className='flex gap-4 text-muted-foreground'>
              <Link href='#' className='hover:text-foreground'>
                <span className='sr-only'>Twitter</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
                </svg>
              </Link>
              <Link href='#' className='hover:text-foreground'>
                <span className='sr-only'>GitHub</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                  <path d='M9 18c-4.51 2-5-2-7-2'></path>
                </svg>
              </Link>
              <Link href='#' className='hover:text-foreground'>
                <span className='sr-only'>Discord</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
            <div className='space-y-3'>
              <h3 className='text-sm font-medium'>Product</h3>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href='#features'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='text-sm font-medium'>Company</h3>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='#contact'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='text-sm font-medium'>Legal</h3>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <p className='text-xs text-muted-foreground text-center md:text-left'>
            © 2025 BetterAuth. All rights reserved.
          </p>
          <p className='text-xs text-muted-foreground text-center md:text-left'>
            Built with Next.js, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </div>
    </footer>
  );
}
