import { Notification, User, UserFollow, UserWithFollow } from "@/types";
import ProfileHeaderStatsDialogCard from "./profile-header-stats-dialog-card";

interface ProfileHeaderStatsDialogListProps {
  loggedInUser: User;
  displayUsers: UserWithFollow[];
  followersList?: UserFollow[];
  followingList?: UserFollow[];
  notifications: Notification[];
  dialogType: string;
}

export default function ProfileHeaderStatsDialogList({
  displayUsers,
  loggedInUser,
  followersList,
  followingList,
  notifications,
  dialogType,
}: ProfileHeaderStatsDialogListProps) {
  if (displayUsers.length === 0) {
    return (
      <p className='text-sm text-muted-foreground'>
        {dialogType === "followers"
          ? "Account doesnot followers yet"
          : "Account doesnot follow anyone yet"}
      </p>
    );
  }

  return (
    <>
      {displayUsers.map((follow) => {
        return (
          <ProfileHeaderStatsDialogCard
            follow={follow}
            key={follow.user.id}
            loggedInUser={loggedInUser}
            followersList={followersList}
            followingList={followingList}
            dialogType={dialogType}
            notifications={notifications}
          />
        );
      })}
    </>
  );
}
