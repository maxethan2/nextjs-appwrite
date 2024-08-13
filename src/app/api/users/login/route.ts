import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const requestBody = await request.json()
  const {email, password} = requestBody

  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)
    // set logged in cookie
    cookies().set('my-custom-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      // expires: Date.now() + 3600
    })
    
    return NextResponse.json(
      {
        message: "Login Succeessful",
        status: true
      }
    )
  }
  catch (error: any) {
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      })
  }
} 