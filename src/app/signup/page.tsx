import { getLoggedInUser } from "@/lib/server/appwrite"

export default async function SignUpPage() {
  const user = await getLoggedInUser()
  if (user) {redirect('/account')}

  return (
    <>
      <form action={signUpWithEmail}>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
        />
        <input
          id="name"
          name="name"
          placeholder="Name"
          type="text"
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signUpWithEmail(formData: any) {
  'use server'

  const email = formData.get('email')
  const password = formData.get('password')
  const name = formData.get('name')

  const { account } = await createAdminClient()

  await account.create(ID.unique(), email, password, name)

  redirect('/login')
}