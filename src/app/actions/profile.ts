'use server'
import { cookies } from "next/headers"
import { createSessionClient } from "@/lib/server/appwrite"
import { Client, Storage, ID, ImageFormat } from "node-appwrite"
import { useUserState } from "@/lib/server/state-management/state";
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

export async function updateProfilePhoto(form: FormData) {
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
  try {
    const response = await storage.getFile(
      process.env.NEXT_PROFILE_STORAGE_ID!,
      user.$id)

      // profile photo already exists
      // delete profile photo then create new profile photo
      const deleteResponse = await storage.deleteFile(
        process.env.NEXT_PROFILE_STORAGE_ID!,
        user.$id
      )

      const createResponse = createNewProfilePhoto(storage, user, file)
      return createResponse
  }
  catch (error: any) {
    // if error is storage_file_not_found meaning that there is no profile photo
    // create new file
    const response = await createNewProfilePhoto(storage, user, file)
    // return response.message = "Profile Photo Updated Sucessfully"
  }
}

export async function createNewProfilePhoto(storage: Storage, user: User, file: File) {
  // create a new profile photo inside the bucket and the file id is the same as the users id
  try{
    const storageResponse = await storage.createFile(
      process.env.NEXT_PROFILE_STORAGE_ID!, // bucket id
      user.$id, // photo id === user id
      file
    )
    return {message: "Profile Photo Uploaded Sucessfully.", response: storageResponse, status: 200}
  }
  catch (error: any) {
    const errorResponse = JSON.stringify(error)
    return {message: "Error uploading Profile Photo", response: errorResponse, status: 400}
  }
}