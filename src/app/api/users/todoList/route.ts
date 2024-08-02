import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Query, ID } from "node-appwrite";

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
    return NextResponse.json({ message: 'Error Fetching Documents', error: error.message }, 
      { status: 500 })
  }
}

// POST
// create collection inside of todo database
// create attributes string: todo boolean: completed
export async function POST(request: NextRequest) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)

  const databases = new Databases(client)

  // const userID = request.nextUrl.searchParams.get('userID')
  // const userEmail = request.nextUrl.searchParams.get('userEmail')

  const requestBody = await request.json()
  const {$id, email} = requestBody
  const userID = $id
  const userEmail = email
  try {
    //  create the new collection
    const newCollection = await databases.createCollection(
      process.env.NEXT_DATABASE_ID!,
      userID!, // collection id
      userEmail!, // name of collection
      [],
      false,
      true
    )

    // create the attributes
    // boolean completed attribute
    const completedAttribute = await databases.createBooleanAttribute(
      process.env.NEXT_DATABASE_ID!,
      userID!, // collection id === userid
      'completed', // key
      true, // required
      undefined, // default value
      false // array
    )

    // string todo attribute
    const todoAttribute = await databases.createStringAttribute(
      process.env.NEXT_DATABASE_ID!,
      userID!, // collection id === userid
      'todo', // key
      128, // size
      true, // required
      undefined, // default
      false, // array
      false // encrypt
    )

    // create a sample todo
    const sampleTodo = await databases.createDocument(
      process.env.NEXT_DATABASE_ID!,
      userID!, // collection id === userid
      ID.unique(),
      {
        completed: true,
        todo: "Create Your First Todo List!"
      }
    )

    return NextResponse.json({message: 'Successfully Created Todo List', success: true},)

  }
  catch (error: any) {
    return NextResponse.json({ message: 'Error Creating Collection', error: error.message }, 
      { status: 500 })
  }
}

// PUT
// create documents inside of collection

// DELETE
// delete a document based on a given id