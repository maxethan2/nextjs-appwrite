"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import ToDo from "./components/Todo"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"

export default function ToDoPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [todoList, setTodoList] = useState<Todo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [todoListExists, setTodoListExists] = useState(true)

  // set user and todoList on load
  useEffect(() => {
    getLoggedInUser()
  }, [])
  // set user and todoList
  const getLoggedInUser = async () => {
    try {
      setLoading(true)
      // get user
      const userResponse = await axios.get('/api/users/loggedInUser')
      const fetchedUser: User = userResponse.data.user
      setUser(fetchedUser)
      // get todo data of user
      if (fetchedUser) {
        // Fetch todo data for the user
        const todoResponse = await axios.get('/api/users/todoList', { params: { userID: fetchedUser.$id } })
        setTodoList(todoResponse.data.todoList.documents)
      }
    }
    catch (error: any) {
      console.log(error.message)
      // setUser(null)
      setTodoListExists(false)
    }
    finally {
      setLoading(false)
    }
  }

  const createTodoList = async () => {
    if (user) {
      try {
        const response = await axios.post('/api/users/todoList/create', user)
        console.log(response)
      }
      catch (error: any){
        console.log(error)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {user?.name}'s todo page
      {/* <button onClick={getToDoList}>click me</button> */}

      <div className="flex flex-col items-center justify-center bg-default-400 p-12 rounded-lg">
        {/* {todoList && <ToDo todo={todoList[0]}/>} */}
        {/* {todoListMapped} */}
        {loading ? <Spinner color="danger"/> :
          todoList?.slice().reverse().map(todoCollection => (
            <ToDo key={todoCollection.$id} todo={todoCollection} />
          ))
        }
        {!todoListExists && (<div>
          <h1>No ToDo List Create One Now</h1>
          <Button color="danger" variant="shadow" onClick={createTodoList}>Create Todo List</Button>
        </div>
        )}
      </div>
    </div>
  )
}