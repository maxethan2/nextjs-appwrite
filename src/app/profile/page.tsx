'use client'
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        setLoading(true)

        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)
      }
      catch (error: any) {
        console.log(error.message)
      }
      finally {
        setLoading(false)
      }
    }

    getLoggedInUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-default-50">
      <div>
        {
          !loading ? 
          (
            <ul>
              <li>
                {`Name: ${user && user.name}`}
              </li>
              <li>
                {`Email: ${user && user.email}`}
              </li>
              <li>
                {`UserId: ${user && user.$id}`}
              </li>
            </ul>          
          )
          :
          (
            <CircularProgress size='lg' color='danger'/>
          )
        }
      </div>
      <div className="flex bg-default-200 p-6">
        <Link href='/profile/todo'>Todo List</Link>
      </div>
    </div>
  );
}