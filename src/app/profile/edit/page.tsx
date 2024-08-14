'use client'
import {Card, CardHeader, CardBody, Input, CardFooter, Divider, Image, Skeleton, Button,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem} from "@nextui-org/react";

import { updateName } from "@/app/actions/profile";
import { useState } from "react";

export default function EditPage() {
  const [newName, setNewName] = useState('')

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <Card>
        <CardHeader>
          <h1>Edit Your Profile Information</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row items-center">
          <h1>Edit Profile Name</h1>
          <form action={() => updateName(newName)} className="flex flex-row items-center">
            <Input 
              className="max-w-[200px] ml-3" 
              placeholder="Enter New Name"
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button 
              color="danger"
              variant="shadow"
              className="ml-3"
              type='submit'
              // onClick={() => updateName(newName)}
            >Update</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}