"use client"
import { Textarea, Checkbox, Tooltip } from "@nextui-org/react"
import { useState, useEffect } from "react"

type Props = {
  todo: Todo
}

export default function ToDo({ todo }: Props) {
  const [disabled, setDisabled] = useState(true)
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  return (
    <div className="flex flex-row bg-default-300 p-2 rounded-lg">
      <Checkbox 
        isDisabled={disabled} 
        color='danger' 
        radius="md"
        isSelected={isCompleted}
        onValueChange={setIsCompleted}
      />

      <Textarea
        disabled={disabled}
        placeholder={todo.todo}
      >
      </Textarea>
      <Tooltip 
        content="Edit Todo"
        color="danger"
        showArrow={true}
        offset={-13}
        // delay={1000}
      >
        <img src='/gear-svgrepo-com.svg' className="w-7 ml-3 hover:w-8 transition-all" onClick={() => setDisabled(prevDisabled => !prevDisabled)}/>
      </Tooltip>
    </div>
  )
}