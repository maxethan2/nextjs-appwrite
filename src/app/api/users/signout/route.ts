// async function signOut() {
//   "use server"

//   const { account } = await createSessionClient()
//   cookies().delete('my-custom-session')
//   await account.deleteSession("current");

//   redirect('/signup')
// }

import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { account } = await createSessionClient()
    cookies().delete('my-custom-session')
    await account.deleteSession('current')

    return NextResponse.json({message: 'Logout Successful', success: true})
  }
  catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}