import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // remove logged in cookie and delete the current session
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