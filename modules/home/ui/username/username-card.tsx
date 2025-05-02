import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import UsernameUpdateForm from "./username-update-form";

export default function Usernamecard({ id }: { id: string }) {
  return (
    <Card className='w-[90%] md:w-1/2 mx-auto mt-10 md:mt-20'>
      <CardHeader>
        <CardTitle className='text-center font-bold text-2xl'>
          Set Username
        </CardTitle>
        <CardContent className='mb-5'>
          <p className='text-xs text-center text-destructive'>
            Without adding an username, you won't be able to use the application
          </p>
          <UsernameUpdateForm id={id} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
