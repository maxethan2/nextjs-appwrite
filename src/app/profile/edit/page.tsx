// NOT USED 
// CAN PROBABLY DELETE IDK






















'use client'
import {Card, CardHeader, CardBody, Input, Divider, Button} from "@nextui-org/react";

import { updateName, updatePassword } from "@/app/actions/profile";
import { useState } from "react";

export default function EditPage() {
  const [newName, setNewName] = useState('')
  const [password, setPassword] = useState({old: "", new: ""})

  return (
    // [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f31260_100%)]
    <div className="min-h-screen flex flex-col justify-center bg-background
    absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
    bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-65% text-default-800">
      <Card
        isBlurred={true}
        className='border-danger-200 border-1'
      >
        <CardHeader>
          <h1 className="text-3xl font-bold">Edit Your Profile Information</h1>
        </CardHeader>
        <Divider className="bg-danger-500"/>
        <CardBody className="flex flex-col items-center justify-center">
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

          <Divider className="mt-3 bg-danger-500"/>
          <h1 className=''>Update Password</h1>
          <form className="flex flex-row items-center" action={() => updatePassword(password.new, password.old)}>
            <div className="flex flex-col">
              <Input 
                className="max-w-[200px] ml-3 my-3" 
                placeholder="Enter Old Password"
                type="password"
                onChange={(e) => setPassword(prevPassword => ({
                  ...prevPassword,
                  old: e.target.value
                })
                )}
              />

              <Input 
                className="max-w-[200px] ml-3" 
                placeholder="Enter New Password"
                type="password"
                onChange={(e) => setPassword(prevPassword => ({
                  ...prevPassword,
                  new: e.target.value
                })
                )}
              />
            </div>

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