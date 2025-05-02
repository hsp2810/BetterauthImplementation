import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function BackButton() {
  return (
    <Link href='/' className={buttonVariants({ variant: "default" })}>
      <MoveLeft className='size-4 mr-1' />
      Back
    </Link>
  );
}
