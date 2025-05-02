import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional if you use className merging

export default function FullScreenLoader({
  className,
  message,
}: {
  className?: string;
  message: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60",
        className
      )}
    >
      <Loader2 className='h-12 w-12 animate-spin text-white' />
      <p className='ml-3 font-semibold'>{message}</p>
    </div>
  );
}
