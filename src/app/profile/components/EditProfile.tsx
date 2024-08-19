'use client'
import {Card, CardHeader, CardBody, Input, Divider, Button} from "@nextui-org/react";

import { updateName, updatePassword } from "@/app/actions/profile";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProfile() {
  const [newName, setNewName] = useState('')
  const [password, setPassword] = useState({old: "", new: ""})

  // handle uploading of profile photo to appwrite storage

  /*
    const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3],
    photo: document.querySelector('#fileInput').files
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
  */
  const handleFileUpload = async () => {
    const fileInput = document.getElementById('uploader') as HTMLInputElement
    const file = fileInput.files![0]

    var formData = new FormData();
    formData.append("image", file)
    
    if (file) {
      try {
        const response = await axios.put('/api/users/profilePhoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response)
      }
      catch (error: any) {
        console.log(error)
      }
    }
    else {
      toast.error('No File Selected')
    }
  }

  return (
    // [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f31260_100%)]
    <div 
    //   className="min-h-screen flex flex-col justify-center bg-background
    // absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
    // bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-65% text-default-800"
      className=""
      >
      <Card
        isBlurred={true}
        className='border-danger-200 border-1'
      >
        {/* <CardHeader>
          <h1 className="text-3xl font-bold">Edit Your Profile Information</h1>
        </CardHeader>
        <Divider className="bg-danger-500"/> */}
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

          <Divider className="mt-3 bg-danger-500"/>
          <h1 className="my-3">Update Profile Photo</h1>
          <div className="flex flex-row">
            <Input type="file" id="uploader" accept=".png, .jpg"/>
            <Button 
                color="danger"
                variant="shadow"
                className="ml-3"
                // type='submit'
                onPress={handleFileUpload}
            >Update</Button>
          </div>
          

        </CardBody>
      </Card>
    </div>
  )
}