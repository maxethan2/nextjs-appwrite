"use client"
import { Textarea, Checkbox, Tooltip, Divider } from "@nextui-org/react"
import { useState, useEffect } from "react"
import {Card, CardHeader, CardBody, CardFooter, Link, Image} from "@nextui-org/react";

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';

type Props = {
  todo: Todo,
  deleteTodo(id: string, collectionId: string): void,
  updateTodo(id: string, collectionId: string, isCompleted: boolean, todoText: string): void
}

export default function ToDo({ todo, deleteTodo, updateTodo }: Props) {
  const [disabled, setDisabled] = useState(true)
  const [isCompleted, setIsCompleted] = useState(todo.completed)
  const [todoText, setTodoText] = useState(todo.todo)

  return (
    <Card className="flex flex-col mb-3 bg-default-300">
      <div className="flex flex-row p-2 rounded-lg">
        <Checkbox 
          isDisabled={disabled} 
          color='danger' 
          radius="md"
          isSelected={isCompleted}
          onValueChange={setIsCompleted}
        />

        <Textarea
          isReadOnly={disabled}
          placeholder={todo.todo}
          variant="flat" // flat faded bordered underlined
          // color='danger'
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
          style={isCompleted ? {textDecoration: 'line-through'} : {}}
        >
        </Textarea>

        <div className="flex items-center justify-center ml-4 transition-all" 
          onClick={() => setDisabled(prevDisabled => !prevDisabled)}
        >
          <Tooltip
            content="Edit Todo"
            color="danger"
            showArrow={true}
            offset={11}
          >
            <SettingsIcon className="text-default-100 hover:text-danger-500 m-auto active:text-danger-600 transition-all" fontSize="large"/>
          </Tooltip>
        </div>

        <div className="flex items-center justify-center ml-4" 
          onClick={() => deleteTodo(todo.$id, todo.$collectionId)}
        >
          <Tooltip
            content="Delete Todo"
            color="danger"
            showArrow={true}
            offset={11}
          >
            <DeleteForeverIcon className="text-default-100 hover:text-danger-500 m-auto active:text-danger-600 transition-all" fontSize="large"/>
          </Tooltip>
        </div>

        <div className="flex items-center justify-center ml-4" 
          onClick={() => updateTodo(todo.$id, todo.$collectionId, isCompleted, todoText)}
        >
          <Tooltip
            content="Update Todo"
            color="danger"
            showArrow={true}
            offset={11}
          >
            <UploadIcon className="text-default-100 hover:text-danger-500 m-auto active:text-danger-600 transition-all" fontSize="large"/>
          </Tooltip>
        </div>
      </div>    
      <Divider className="bg-default-300"/> 
    </Card>
  )
}