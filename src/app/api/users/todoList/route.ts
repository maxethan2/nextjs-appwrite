import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query, ID } from "node-appwrite";

// GET
// Request Todo List collection
// Takes userID to get collection ID
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
    return NextResponse.json({ message: 'Error Fetching Documents', error: error.message }, 
      { status: 500 })
  }
}

// POST 
// create a new document/todo

// PUT
// update documents/todos based on given ids and values

// DELETE
// delete a document/todo based on a given id
export async function DELETE(request: NextRequest) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)

  const databases = new Databases(client)
  const id = request.nextUrl.searchParams.get('id')
  const collectionId = request.nextUrl.searchParams.get('collectionId')

  try {
    // make sure id and collectionid are non null values
    if (id === null || collectionId === null) {throw new Error("Id and CollectionId must be non-null")}

    const deleteDocument = await databases.deleteDocument(
      process.env.NEXT_DATABASE_ID!,
      collectionId,
      id
    )

    return NextResponse.json({message: "Successfully Deleted Document", success: true})
  }
  catch (error: any) {
    return NextResponse.json({ message: 'Error Deleting Document', error: error.message }, 
      { status: 500 })
  }
}