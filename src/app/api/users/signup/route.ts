import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const requestBody = await request.json()
  const {email, password, username} = requestBody

  const { account } = await createAdminClient()
  try {
    await account.create(ID.unique(), email, password, username)

    return NextResponse.json({message: "Account Created Successfully!", status: true})
  }
  catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}