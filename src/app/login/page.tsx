'use client'

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react";

export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const loginClick = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/login', user)
      toast.success(response.data.message)
      router.push('/profile')
    }
    catch (error: any) {
      console.log(error)
      toast.error(`Login Failed: ${error.response.data.message}`) 
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
            <p className="text-xl">
              Login With Email And Password
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
          <div className="flex">
            <Button 
              type="submit"
              variant="shadow"
              isLoading={loading}
              onClick={loginClick}
              className="m-auto mb-4"
            >Login</Button>
          </div> 
        {/* </form> */}
        <Link href='/signup' className="m-auto hover:text-blue-300 hover:underline">Don't have an account? Signup Now!</Link>
      </div>
    </div>
  );
}

