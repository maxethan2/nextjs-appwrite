'use server'
import { cookies } from "next/headers"
import { createSessionClient } from "@/lib/server/appwrite"
import { Client, Storage, ID } from "node-appwrite"
import axios from "axios"

// update name server action
export async function updateName(newName: string) {
  // make sure that user is logged in
  const session = cookies().get('my-custom-session')
  if(!session || !session.value) {
    throw new Error('No Session')
  }

  try {
    // get logged in account
    const { account } = await createSessionClient()
    // const user = await account.get()
    
    account.updateName(newName)
  } 
  catch (error: any) {
    return error.message
  }
}

export async function updatePassword(newPassword: string, oldPassword: string) {
  // make sure that user is logged in
  const session = cookies().get('my-custom-session')
  if(!session || !session.value) {
    throw new Error('No Session')
  }
  try {
    // get logged in account
    const { account } = await createSessionClient()
    // const user = await account.get()
    
    account.updatePassword(
      newPassword,
      oldPassword
    )
  } 
  catch (error: any) {
    return error.message
  }
}

export async function updateProfile(form: FormData) {
  // ensure that user is logged in
  var user
  try {
    const { account } = await createSessionClient()
    user = await account.get()
  }
  catch (error: any){
    return {message: "No user logged in", error: error}
  }

  const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.NEXT_APPWRITE_KEY!)
  
  const storage = new Storage(client)

  const file = form.get('image') as File

  // check if user already has a profile photo



  // if they dont create a new file
  try{
    const storageResponse = await storage.createFile(
      process.env.NEXT_PROFILE_STORAGE_ID!, // bucket id
      user.$id, // photo id === user id
      file
    )
    return {message: "Profile Photo Uploaded Sucessfully.", response: storageResponse}
  }
  catch (error: any) {
    const errorResponse = JSON.stringify(error)
    return {message: "Error uploading Profile Photo", error: errorResponse}
  }
}