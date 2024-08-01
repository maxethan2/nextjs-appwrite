import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query } from "node-appwrite";

// GET
// Request Todo List collection
// Takes userID to get collection ID
// 
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
      // collection id === user id
      userID!
    )
    return NextResponse.json({message: 'Successfully Retrived User ToDoList', todoList: todoList})
  }
  catch (error: any) {
    return NextResponse.json({ message: 'Error fetching documents', error: error.message }, 
      { status: 500 })
  }
}

// POST
// create collection inside of todo database
// create attributes string: todo boolean: completed



// PUT
// create documents inside of collection

// DELETE
// delete a document based on a given id