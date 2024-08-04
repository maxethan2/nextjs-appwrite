"use client"
import { Textarea, Checkbox, Tooltip, Divider } from "@nextui-org/react"
import { useState, useEffect } from "react"
import {Card, CardHeader, CardBody, CardFooter, Link, Image} from "@nextui-org/react";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
  todo: Todo,
  deleteTodo(id: string, collectionId: string): void
}

export default function ToDo({ todo, deleteTodo }: Props) {
  const [disabled, setDisabled] = useState(true)
  const [isCompleted, setIsCompleted] = useState(todo.completed)

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
        >
        </Textarea>
        <Tooltip 
          content="Edit Todo"
          color="danger"
          showArrow={true}
          offset={-13}
          // delay={1000}
        >
          <img src='/gear-svgrepo-com.svg' className="w-7 ml-3 hover:rotate-90 transition-all" onClick={() => setDisabled(prevDisabled => !prevDisabled)}/>
        </Tooltip>

        <div className="flex items-center justify-center ml-4" 
          onClick={() => deleteTodo(todo.$id, todo.$collectionId)}
        >

          <Tooltip
            content="Delete Todo"
            color="danger"
            showArrow={true}
            offset={11}
          >
            <DeleteForeverIcon className="text-default-200 hover:text-danger-500 m-auto active:text-danger-600 transition-all" fontSize="large"/>
          </Tooltip>
        </div>
      </div>    
      <Divider className="bg-default-300"/> 
    </Card>
  )
}