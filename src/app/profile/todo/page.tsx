"use client"

import axios from "axios"
import { useState, useEffect } from "react"

export default function ToDoPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)
      }
      catch (error: any) {
        console.log(error.message)
        setUser(null)
      }
    }
    getLoggedInUser()
  }, [])
  
  const buttonClick = async () => {
    try {
      if (!user) {throw new Error("User Does Not Exist")}
      
      const response = await axios.get('/api/users/todoList', {params: {userID: user.$id}})
      console.log(response)
    }
    catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      todo page
      <button onClick={buttonClick}>click me</button>
    </div>
  )
}