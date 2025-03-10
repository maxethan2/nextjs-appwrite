"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import ToDo from "./components/Todo"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import {Card, CardHeader, CardBody, CardFooter, Link, Image, ScrollShadow} from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';
import toast, {Toaster} from "react-hot-toast"
import { useUserState, useTodoListState } from "@/lib/server/state-management/state"

export default function ToDoPage() {
  const router = useRouter()
  const [user, setUser] = useState<User>(useUserState((state) => state.user))
  const [todoList, setTodoList] = useState<Todo[] | null>(useTodoListState((state) => state.todoList))
  const [loading, setLoading] = useState(false)
  const [todoListExists, setTodoListExists] = useState(true)

  // set user and todoList on load
  // fetch and set todo list and update zustand state when todolist is updated
  // runs everytime the user is updated or the todoList is updated
  useEffect(() => {
    // fetch and set user
    const getLoggedInUser = async () => {
      fetchData: try {
        // if user data is already fetched don't fetch again
        if (user.$id != "none") {
          // check to see if todo list needs to be fetched
          getTodoList(user)
          break fetchData
        }
        
        setLoading(true)
        // get user
        const userResponse = await axios.get('/api/users/loggedInUser')
        const fetchedUser: User = userResponse.data.user
        setUser(fetchedUser)
        // get todo data of user
        if (fetchedUser) {
          // Fetch todo data for the user
          getTodoList(fetchedUser)
        }
      }
      catch (error: any) {
        console.log(error.message)
        setTodoListExists(false)
      }
      finally {
        setLoading(false)
      }
    }

    // get todo list if it has not been fetched already
    // update the global state if the todo list already exists
    const getTodoList = async (user: User) => {
      fetchData: try {
        // if todo list is already fetched
        if (todoList != null) {
          // update the zustand state
          useTodoListState.setState({todoList: todoList})
          // break out of fetching todolist as it already exists and is up to date
          break fetchData
        }

        // Fetch todo data for the user
        const todoResponse = await axios.get('/api/users/todoList', { params: { userID: user.$id } })
        setTodoList(todoResponse.data.todoList.documents)
        // set todo list in state
        useTodoListState.setState({todoList: todoResponse.data.todoList.documents})
      }
      catch (error: any) {
        console.log("hello" ,error)
        setTodoListExists(false)
      }
    }
    getLoggedInUser()
  }, [user, todoList])

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
  // after database call works successfully then delete the todo form the local todo array
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
      const positionOfDeletedTodo = todoList!.map(e => e.$id).indexOf(id)
      // if deleted todo is not at the front of the array
      if (positionOfDeletedTodo && positionOfDeletedTodo != 0) {
        setTodoList(prevTodoList => {
          // create copy to splice then return
          const newTodoList = [...prevTodoList!]
          newTodoList.splice(positionOfDeletedTodo, 1)
          return newTodoList
        })
        toast.success("Deleted Todo")
      }
      // deleted todo is first in the array and the todo list contains that single todo
      // then set the todo list to an empty array
      else if (positionOfDeletedTodo === 0 && todoList!.length === 1) {
        setTodoList([])
        toast.success("Deleted Todo")
      }
      // deleted todo is the first in the array and the todo length is more than one
      // instead of splicing, shift
      else if (positionOfDeletedTodo === 0 && todoList!.length != 1) {
        setTodoList(prevTodoList => {
          const newTodoList = [...prevTodoList!]
          newTodoList.shift()
          return newTodoList
        })
        toast.success("Deleted Todo")
      }
      else {
        // should never reach
        toast.error("Index Does Not Exist")
      }
    }
    catch (error: any) {
      // api error
      toast.error(error.response.data.error)
    }
  }

  const addTodo = async () => {
    try {
      const response = await axios.post("/api/users/todoList", user)
      const newTodo: Todo = response.data.data

      // add newTodo to local todo array to avoid re-fetching data
      setTodoList(prevTodoList => {
        const newTodoList = [...prevTodoList!]
        newTodoList.push(newTodo)
        return newTodoList
      })
      toast.success('Created New Todo')
    }
    catch (error: any) {
      console.log(error.message)
    }
  }

  const updateTodo = async (id: string, collectionId: string, isCompleted: boolean, todoText: string) => {
    try{
      const response = await axios.put('/api/users/todoList', {
        id: id,
        collectionId: collectionId,
        isCompleted: isCompleted,
        todoText: todoText
      })
      toast.success("Updated Todo Item")
      // set zustand todolist state

    }
    catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
    <Toaster />
    <div className="min-h-screen flex flex-col justify-center bg-background
    absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
    bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-95% text-default-800">
      {user?.name}&apos;s todo page
      <Card className="bg-divider flex flex-col justify-center items-center px-12 pb-12 h-5/6">
        <ScrollShadow className="w-[400px]">
          <CardHeader className="flex flex-row">
            {/* dont render add todolist button if todo list does not exist */}
            {
              todoList ?
              (
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
              )
              : (<></>)
            }
          </CardHeader>
          
          <div className="flex flex-col items-center justify-center rounded-lg">
            {loading 
              ? <Spinner color="danger"/> 
              :
                todoList?.slice().reverse().map(todoCollection => (
                  <ToDo key={todoCollection.$id} todo={todoCollection} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
                ))
            }
            {!todoListExists && (
              <div>
                <h1>No ToDo List Create One Now</h1>
                <Button color="danger" variant="shadow" onClick={createTodoList}>Create Todo List</Button>
              </div>
            )}
          </div>
        </ScrollShadow>
      </Card>
    </div>
    </>
  )
}