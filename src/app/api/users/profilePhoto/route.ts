import { createSessionClient } from "@/lib/server/appwrite"
import { NextRequest, NextResponse } from "next/server"
import { Storage, Client } from "node-appwrite"

export async function GET() {
  // ensure that user is logged in
  var user
  try {
    const { account } = await createSessionClient()
    user = await account.get()
  }
  catch (error: any){
    return NextResponse.json({message: "No user logged in", error: error}, {status: 400}) 
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)
  
  const storage = new Storage(client)
  try {
    // filePreview is an ArrayBuffer
    const filePreview = await storage.getFilePreview(
      process.env.NEXT_PROFILE_STORAGE_ID!, // bucket id
      user.$id,
    )
    // Convert data to Buffer so it can be converted to base64
    const buffer = Buffer.from(filePreview)
    const base64Image = buffer.toString('base64')
    // create imageUrl out of base64 string
    const imageUrl = `data:image/png;base64,${base64Image}`

    return NextResponse.json({message: 'Successfully Retrieved Image Preview', imageUrl: imageUrl, success: true}, {status: 200})
  }
  catch (error: any){
    return NextResponse.json({message: 'Failed to Retrieve Image Preview', error: error, success: true}, {status: 400}) 
  }
}