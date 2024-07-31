'use client'

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const signupClick = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/signup', user)
      toast.success(response.data.message)
      router.push('/login')
    }
    catch (error: any) {
      const errorMessage = error.response.data.error
      toast.error(`Login Failed: ${errorMessage}`) 
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-row min-h-screen">
      <div className="m-auto bg-danger-300 p-6 rounded-xl">
        <Toaster />
        {/* <form action={loginClick} className="m-auto"> */}
          <div className="flex mb-3 m-auto">
            <p className="text-xl m-auto">
              Signup
            </p>
          </div>
          <Input 
            id="email"
            name="email"
            // placeholder="Email"
            label='Email'
            type="email"
            onChange={(event) => setUser({...user, email: event.target.value})}
            className="text-black mb-3"
          />
          <Input
            id="password"
            name="password"
            // placeholder="Password"
            label='Password'
            minLength={8}
            type="password"
            onChange={(event) => setUser({...user, password: event.target.value})}
            className="text-black mb-3"
          />
          <Input 
            id="username"
            name="username"
            // placeholder="Email"
            label='Username'
            type="username"
            onChange={(event) => setUser({...user, username: event.target.value})}
            className="text-black mb-3"
          />
          <div className="flex">
            <Button 
              type="submit"
              variant="shadow"
              isLoading={loading}
              onClick={signupClick}
              className="m-auto mb-4"
            >Signup</Button>
          </div> 
        {/* </form> */}
        <Link href='/login' className="m-auto hover:text-blue-300 hover:underline">Already Have An Account? Login Here!</Link>
      </div>
    </div>
  );
}