import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserWithAccountsAndSessions } from "@/types";
import UserAdminApplicationForm from "./user-admin-application-form";

interface UserAdminApplicationCardProps {
  user: UserWithAccountsAndSessions;
}

export default function UserAdminApplicationCard({
  user,
}: UserAdminApplicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply to become an admin</CardTitle>
      </CardHeader>

      {user.adminRequested ? (
        <p className='px-6 text-sm text-destructive'>
          Already requested for an Admin
        </p>
      ) : (
        <CardContent>
          {user.role === "admin" ? (
            <p>You are already an admin</p>
          ) : (
            <UserAdminApplicationForm userId={user.id} />
          )}
        </CardContent>
      )}
    </Card>
  );
}
