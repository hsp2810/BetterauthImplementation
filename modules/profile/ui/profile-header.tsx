import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { db } from "@/db";
import { notification, userFollow } from "@/db/schema";
import { User, UserWithFollow } from "@/types";
import { eq } from "drizzle-orm";
import ProfileEditMenu from "./profile-edit-menu";
import ProfileFollowCustomButton from "./profile-follow-custom-button";
import ProfileHeaderStats from "./profile-header-stats";

interface ProfileHeaderProps {
  targetUser: User;
  loggedInUser: User;
  followStatus: string;
  followers: UserWithFollow[];
  following: UserWithFollow[];
}

export async function ProfileHeader({
  targetUser,
  loggedInUser,
  followStatus,
  followers,
  following,
}: ProfileHeaderProps) {
  const isLoggedIn = targetUser.id === loggedInUser.id;

  //Followstatus for every follower and following,
  const followersList = await db
    .select()
    .from(userFollow)
    .where(eq(userFollow.followingId, loggedInUser.id));

  const followingList = await db
    .select()
    .from(userFollow)
    .where(eq(userFollow.followerId, loggedInUser.id));

  const notifications = await db
    .select()
    .from(notification)
    .where(eq(notification.senderId, loggedInUser.id));

  return (
    <div className='mb-8'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10'>
        <div className='flex flex-col gap-3'>
          <UserAvatar
            imageUrl={targetUser.image || ""}
            size={"xl"}
            name={targetUser.name}
            className='rounded-full'
          />
          <h3 className='text-center text-lg font-semibold text-muted-foreground'>
            @{targetUser.username}
          </h3>
          <Badge variant={"outline"} className='mx-auto'>
            {targetUser.user_type?.toUpperCase()} USER
          </Badge>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <div className='flex items-center space-between gap-4 mb-3'>
            <h1 className='text-xl font-semibold'>{targetUser.name}</h1>
            {isLoggedIn && <ProfileEditMenu targetUser={targetUser} />}
          </div>

          {/* If the loggedINuser if following this targetUser or if the targetUser if visiting profile */}
          <ProfileHeaderStats
            targetUser={targetUser}
            loggedInUser={loggedInUser}
            followers={followers}
            following={following}
            followersList={followersList}
            followingList={followingList}
            followStatus={followStatus}
            notifications={notifications}
          />

          {/* Follow Custom Button */}
          <ProfileFollowCustomButton
            followStatus={followStatus}
            targetUser={targetUser}
            loggedInUser={loggedInUser}
            className='w-full'
          />

          <Separator className='w-full my-4' />
          <div className='space-y-2'>
            <div className='text-muted-foreground whitespace-pre-wrap'>
              {targetUser.user_bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
