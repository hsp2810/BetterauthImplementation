import { auth } from "@/lib/auth";
import AdminHomeSection from "@/modules/admin/ui/admin-home-section";
import UserHomeSection from "@/modules/user/ui/user-home-section";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  const isAdmin = session?.user.role == "admin";

  return (
    <div className='min-h-screen py-24 px-10'>
      <h1 className='font-bold text-xl'>Welcome, {session?.user.name}</h1>

      {isAdmin ? <AdminHomeSection /> : <UserHomeSection />}
    </div>
  );
}
