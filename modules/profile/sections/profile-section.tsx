import { checkFollowStatus } from "@/lib/follow";
import { getFollowers, getFollowing } from "@/modules/user/server";
import { User } from "@/types";
import { Lock } from "lucide-react";
import { ProfileHeader } from "../ui/profile-header";
import { ProfilePosts } from "../ui/profile-posts";
import { ProfileTabs } from "../ui/profile-tabs";

interface ProfileSectionProps {
  targetUser: User;
  loggedInUser: User;
}

export default async function ProfileSection({
  targetUser,
  loggedInUser,
}: ProfileSectionProps) {
  const isLoggedIn = targetUser.id === loggedInUser.id;
  let followStatus: string = "Follow";

  let followers, following;
  // If not loggedin then I will check the follow status
  if (!isLoggedIn) {
    followStatus = await checkFollowStatus(loggedInUser.id, targetUser.id);
    console.log("Follow status: ", followStatus);
    followers = await getFollowers(targetUser.id);
    following = await getFollowing(targetUser.id);
  } else {
    followers = await getFollowers(loggedInUser.id);
    following = await getFollowing(loggedInUser.id);
  }

  const showFullProfile = targetUser.user_type === "public" || isLoggedIn;

  return (
    <div className='min-h-screen pt-5'>
      <div className='flex flex-col items-center px-10'>
        <ProfileHeader
          targetUser={targetUser}
          loggedInUser={loggedInUser}
          followStatus={followStatus}
          followers={followers}
          following={following}
        />
        <ProfileTabs isLoggedIn={isLoggedIn} />
        {showFullProfile ? (
          <ProfilePosts />
        ) : (
          <div className='flex text-muted-foreground flex-col items-center gap-3 mt-5'>
            <span className='border border-muted-foreground rounded-full p-7'>
              <Lock className='size-7' />
            </span>
            <h2 className='font-semibold'>Account is private</h2>
          </div>
        )}
      </div>
    </div>
  );
}
