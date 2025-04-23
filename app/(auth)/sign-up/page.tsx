import SignUpForm from "@/modules/auth/ui/sign-up-form";

export default function Signup() {
  return (
    <div className='flex flex-col items-center gap-14 '>
      <h1 className='font-bold text-4xl'>Sign-up</h1>
      <SignUpForm />
    </div>
  );
}
