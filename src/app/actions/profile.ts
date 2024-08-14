'use server'
// update name server action
export async function updateName(newName: string) {
  // make sure that user is logged in

  // verify that the name is valid (not empty, etc)
  if (newName.length === 0) {
    // console.log("Invalid Name, Must be longer than 0 characters")
    return {message: "Invalid Name, Must be longer than 0 characters", status: 400}
  }



  console.log(newName)
}