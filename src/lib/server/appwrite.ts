'use server'
import { Client, Account, Databases, Query } from "node-appwrite"
import { cookies } from "next/headers"

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

  const session = cookies().get('my-custom-session')
  if(!session || !session.value) {
    throw new Error('No Session')
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    }
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)

    return {
      get account() {
        return new Account(client)
      }
    }
}

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient()
//     return await account.get()
//   }
//   catch (error:any) {
//     return null
//   }
// }