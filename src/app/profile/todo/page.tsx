"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import ToDo from "./components/Todo"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import {Card, CardHeader, CardBody, CardFooter, Link, Image} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';

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

  // create a todolist collection document and attributes if the user is new and doesnt have one yet
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

  // take id and collection id from todo component and delete todo from database
  // after databse call works successfully then delete the todo form the local todo array
  const deleteTodo = async (id: string, collectionId: string) => {
    // deleting todo from database
    try {
      const response = await axios.delete('/api/users/todoList', {
        params: {
          id: id,
          collectionId: collectionId
        }
      })

      // delete todo from local todo[]
      const positionOfDeletedTodo = todoList?.map(e => e.$id).indexOf(id)
      if (positionOfDeletedTodo) {
        // todoList?.splice(positionOfDeletedTodo, 1)
        setTodoList(prevTodoList => {
          // create copy to splice then return
          const newTodoList = [...prevTodoList!]
          newTodoList.splice(positionOfDeletedTodo, 1)
          return newTodoList
        })
      }
      else {
        console.log('Index Does Not Exists')
      }
    }
    catch (error: any) {
      console.log(error.message)
    }
  }

  const addTodo = async () => {
    try {
      const response = await axios.post("/api/users/todoList", user)
      const newTodo: Todo = response.data.data

      // add newTodo to local todo to avoid reftching data
      setTodoList(prevTodoList => {
        const newTodoList = [...prevTodoList!]
        newTodoList.push(newTodo)
        return newTodoList
      })
    }
    catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {user?.name}&apos;s todo page
      <Card className="bg-secondary-50 flex flex-col justify-center items-center px-12 pb-12">
        <CardHeader className="flex flex-row">
          <div className="flex m-auto">
            <h1 className="my-auto">Add New Todo</h1>
            <Button
              isIconOnly={true}
              variant="shadow"
              color="danger"
              className="ml-3"
              onClick={addTodo}
            >
              <AddIcon />
            </Button>
          </div>
        </CardHeader>
        
        <div className="flex flex-col items-center justify-center rounded-lg">
          {loading ? <Spinner color="danger"/> :
            todoList?.slice().reverse().map(todoCollection => (
              <ToDo key={todoCollection.$id} todo={todoCollection} deleteTodo={deleteTodo}/>
            ))
          }
          {!todoListExists && (<div>
            <h1>No ToDo List Create One Now</h1>
            <Button color="danger" variant="shadow" onClick={createTodoList}>Create Todo List</Button>
          </div>
          )}
        </div>
      </Card>
      
    </div>
  )
}