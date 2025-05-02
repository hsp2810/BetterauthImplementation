import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleAuthButton from "@/modules/auth/ui/google-auth-button";
import SignUpForm from "@/modules/auth/ui/sign-up-form";
import { Camera } from "lucide-react";

export default function Signup() {
  return (
    <Card className='w-[380px] bg-card/50 backdrop-blur-xl border'>
      <CardHeader className='space-y-1 flex flex-col items-center'>
        <div className='flex items-center gap-2 mb-2'>
          <Camera className='h-6 w-6' />
          <span className='font-bold text-xl'>
            Snapiq
          </span>
        </div>
        <CardTitle className='text-2xl'>Create an account</CardTitle>
        <CardDescription>Sign up to get started with Snapiq</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <GoogleAuthButton />
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border'></span>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
