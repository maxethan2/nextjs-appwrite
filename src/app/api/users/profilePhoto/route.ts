import { NextResponse, NextRequest } from "next/server";
import { Client, Storage, Query, ID } from "node-appwrite";


// upload profile photo if one didnt exist before
export async function PUT(request: NextRequest) {


  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)
  
    const storage = new Storage(client)
    // const {file} = response
    try{
      // const promise = storage.createFile(
      //   process.env.NEXT_PROFILE_STORAGE_ID!,
      //   ID.unique // photo id === user id

      // )
      return NextResponse.json({message: "Profile photo uploaded successfully", success: true})
    }
    catch (error: any) {
      return NextResponse.json({message: 'Failed to create profile photo'}, {status: 400})
    }

}

// update a profile photo if one already exists
export async function POST() {

}