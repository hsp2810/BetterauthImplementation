import BackButton from "@/modules/auth/ui/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-10'>
      <div className='absolute top-1/2 -right-20 w-80 h-80 rounded-full blur-3xl'></div>
      <BackButton />
      <div className='flex flex-col items-center justify-center'>
        {children}
      </div>
    </div>
  );
}
