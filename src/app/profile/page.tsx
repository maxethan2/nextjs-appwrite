'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)
      }
      catch (error: any) {
        console.log(error.message)
      }
    }

    getLoggedInUser()
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center bg-default-50">
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
    </div>
  );
}