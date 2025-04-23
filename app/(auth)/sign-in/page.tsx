import SignInForm from "@/modules/auth/ui/sign-in-form";

export default function Signin() {
  return (
    <div className='flex flex-col items-center gap-14'>
      <h1 className='font-bold text-4xl'>Signin</h1>
      <SignInForm />
    </div>
  );
}
