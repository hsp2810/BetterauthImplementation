import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { textToInitials } from "@/lib/text";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "size-12",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-40 w-40",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export default function UserAvatar({
  imageUrl,
  name,
  size,
  className,
  onClick,
}: UserAvatarProps) {
  return (
    <Avatar className={cn(avatarVariants({ size, className }))}>
      <AvatarImage src={imageUrl} alt={name} onClick={onClick} />
      <AvatarFallback className='rounded-lg'>
        {textToInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
