import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query } from "node-appwrite";

export async function GET(request: NextRequest) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)

  const databases = new Databases(client)

  const userID = request.nextUrl.searchParams.get('userID')

  try {
    const todoList = await databases.listDocuments(
      process.env.NEXT_DATABASE_ID!,
      userID!
    )

    return NextResponse.json({message: 'Successfully Retrived User ToDoList', todoList})
  }
  catch (error: any) {
    return NextResponse.json({ message: 'Error fetching documents', error: error.message }, 
      { status: 500 })
  }
}