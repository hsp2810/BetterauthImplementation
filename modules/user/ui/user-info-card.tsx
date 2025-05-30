import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getTimeAgo } from "@/lib/date";
import { UserWithAccountsAndSessions } from "@/types";
import UserFunctionMenu from "./user-function-menu";
import { textToInitials } from "@/lib/text";

interface UserInfoCardProps {
  user: UserWithAccountsAndSessions;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card className='relative w-fit'>
      <div className='absolute top-5 right-5'>
        <UserFunctionMenu user={user} />
      </div>

      <p className='px-6 text-destructive font-semibold text-xs md:text-sm'>
        Id is not shown full for security reasons
      </p>
      <Avatar className='size-36 m-auto'>
        <AvatarImage
          src={user.image || ""}
          className='object-cover h-full w-full rounded-full'
          alt={user.name}
        />
        <AvatarFallback className='font-semibold text-2xl'>
          {textToInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <CardContent className='grid grid-cols-2 gap-4 text-sm md:text-base'>
        <h4 className='font-semibold text-muted-foreground'>Id</h4>
        <h4 className=''>{user.id.slice(0, 7).concat("...")}</h4>

        <h4 className='font-semibold text-muted-foreground'>Name</h4>
        <h4 className=''>{user.name}</h4>

        <h4 className='font-semibold text-muted-foreground'>Email</h4>
        <h4 className='truncate'>{user.email}</h4>

        <h4 className='font-semibold text-muted-foreground'>Role</h4>
        <h4 className=''>{user.role?.toUpperCase()}</h4>

        <h4 className='font-semibold text-muted-foreground'>Last session</h4>
        <h4 className=''>
          {user.sessions && user.sessions[0]
            ? getTimeAgo(user.sessions[0]?.createdAt)
            : getTimeAgo(user.updatedAt)}
        </h4>

        <h4 className='font-semibold text-muted-foreground'>Platform</h4>
        <div className='flex gap-2 flex-wrap'>
          {user.accounts.map((account) => (
            <h4 key={account.id}>{account.providerId.toUpperCase()}</h4>
          ))}
        </div>

        <h4 className='font-semibold text-muted-foreground'>Created at</h4>
        <h4 className=''>{getTimeAgo(user.createdAt)}</h4>

        <h4 className='font-semibold text-muted-foreground'>Updated at</h4>
        <h4 className=''>{getTimeAgo(user.updatedAt)}</h4>
      </CardContent>
    </Card>
  );
}
