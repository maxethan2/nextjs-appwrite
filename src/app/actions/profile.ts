'use server'
import { cookies } from "next/headers"
import { createSessionClient } from "@/lib/server/appwrite"

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