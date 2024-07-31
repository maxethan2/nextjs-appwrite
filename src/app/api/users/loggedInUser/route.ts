import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/server/appwrite";

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient()
//     return await account.get()
//   }
//   catch (error:any) {
//     return null
//   }
// }

export async function GET() {
  try {
    const { account } = await createSessionClient()
    const user = await account.get()

    return NextResponse.json({user: user, success: true})
  }
  catch (error: any) {
    return NextResponse.json({message: "No User Currently Logged In."}, {status: 400})
  }
}