"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import ToDo from "./components/Todo"
import { todo } from "node:test"
import { Spinner } from "@nextui-org/react"

export default function ToDoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [todoList, setTodoList] = useState<Todo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [todoListExists, setTodoListExists] = useState(true)

  // set user and todoList
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        setLoading(true)
        // get user
        const userResponse = await axios.get('/api/users/loggedInUser')
        const fetchedUser = userResponse.data.user
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
        setUser(null)
        setTodoListExists(false)
      }
      finally {
        setLoading(false)
      }
    }
    getLoggedInUser()
  }, [])

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      todo page
      {/* <button onClick={getToDoList}>click me</button> */}

      <div className="flex flex-col items-center justify-center bg-default-400 p-12 rounded-lg">
        {/* {todoList && <ToDo todo={todoList[0]}/>} */}
        {/* {todoListMapped} */}
        {loading ? <Spinner color="danger"/> :
          todoList?.slice().reverse().map(todoCollection => (
            <ToDo key={todoCollection.$id} todo={todoCollection} />
          ))
        }
        {!todoListExists && "No ToDo List Create One Now"}
      </div>
    </div>
  )
}