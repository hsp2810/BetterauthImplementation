import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeAgo, getTimeUntil } from "@/lib/date";
import { UserWithAccountsAndSessions } from "@/types";
import AdminUsersMenu from "./admin-users-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminUsersTable({
  users,
}: {
  users: UserWithAccountsAndSessions[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const loggedInUser = session?.user;
  return (
    <>
      <p className='text-xs md:text-sm font-semibold text-destructive'>
        Cannot show full id and password of the user even to the admins.
      </p>
      <p className='text-xs md:text-sm font-semibold text-destructive'>
        You need to be a superadmin to edit, ban or delete an admin
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-center'>Reason for Ban</TableHead>
            <TableHead className='text-center'>Banned until</TableHead>
            <TableHead className='text-center'>Platform</TableHead>
            <TableHead className='text-center'>Last signedin</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id.slice(0, 5).concat("...")}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role?.toUpperCase()}</TableCell>
              <TableCell className='text-center'>
                {!user.banned ? "ACTIVE" : "BANNED"}
              </TableCell>
              <TableCell className='text-center'>
                {!user.banned ? "-" : user.banReason}
              </TableCell>
              <TableCell className='text-center'>
                {!user.banned ? "-" : getTimeUntil(user.banExpires!)}
              </TableCell>
              <TableCell className='text-center'>
                {user.accounts.map((account) => (
                  <div key={account.id}>{account.providerId.toUpperCase()}</div>
                ))}
              </TableCell>
              <TableCell className='text-center'>
                {user.sessions[0]
                  ? getTimeAgo(user.sessions[0]?.createdAt)
                  : getTimeAgo(user.updatedAt)}
              </TableCell>
              <TableCell>{getTimeAgo(user.createdAt)}</TableCell>
              <TableCell>{getTimeAgo(user.updatedAt)}</TableCell>
              {((loggedInUser?.role == "admin" && user.role === "user") ||
                loggedInUser?.role == "superadmin") && (
                <TableCell className='text-center pt-4'>
                  <AdminUsersMenu user={user} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
