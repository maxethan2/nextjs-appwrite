import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/server/appwrite";

// create the verification email
// user will be sent an email that will redirect them to the url passed to craeateverification with necessary info to verify email
export async function POST(request: NextRequest) {
  try {
    const { account } = await createSessionClient()

    const result = await account.createVerification(
      'http://localhost:3000/profile/verifyEmail' // url to redirect user to in confirmation email
    )

    return NextResponse.json({message: "Successfully sent verification email.", result: result, success: true})
  }
  catch (error: any) {
    return NextResponse.json({message: "Failed to create email verification.", error: error}, {status: 400})
  }
}

// take params from email verification and try to verify email
// 
// this function gets run when the user routes to the verifyemail page with 
// the params passed through search params
export async function PUT(request: NextRequest) {
  const response = await request.json()
  const {userId, secret} = response

  try {
    const { account } = await createSessionClient()

    const result = await account.updateVerification(
      userId,
      secret
    )

    return NextResponse.json({message: "Verified email successfully.", result: result, success: true})
  }
  catch (error: any) {
    return NextResponse.json({message: "Failed to verify email.", error: error}, {status: 400})
  }
}