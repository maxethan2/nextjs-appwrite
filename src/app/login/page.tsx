import { getLoggedInUser } from "@/lib/server/appwrite"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const user = await getLoggedInUser()
  if (user) {redirect('/account')}

  return (
    <>
      <form action={loginWithEmail}>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          className="text-black"
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
          className="text-black"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";

export async function loginWithEmail(formData: any) {
  'use server'
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const {account} = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('my-custom-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    redirect('/account')
  }
  catch (error: any) {
    console.log(error.message)
  }
}