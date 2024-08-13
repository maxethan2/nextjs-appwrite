'use client'
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Skeleton, Button,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem} from "@nextui-org/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(true)

  // fetch the logged in user on load once
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        setIsLoaded(false)

        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)
      }
      catch (error: any) {
        console.log(error.message)
      }
      finally {
        setIsLoaded(true)
      }
    }

    getLoggedInUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <Card className="max-w-[600px]">
        <CardHeader className="flex flex-row gap-3">
          <Image 
            src='./shyguy.png'
          />
          <Skeleton isLoaded={isLoaded} className='rounded-lg'>
            <div>
              <h1>{user?.name}</h1>
              <h1>{user?.email}</h1>
            </div>
          </Skeleton>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="shadow"
                color="danger"
                endContent={<KeyboardArrowDownIcon />}
              >
                Settings
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Verify Email</DropdownItem>
              <DropdownItem key="copy">Verify Phone</DropdownItem>
              <DropdownItem key="edit">Change Password</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete Account
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
      </Card>


      <div className="flex flex-row mt-3">
        <Card className="max-w-[350px] bg-gradient-to-tr from-danger-200 from-10% to-danger-300 to-65% text-default-800">
          <CardHeader>
            Your Personal Todo List
          </CardHeader>
          <Divider />
          <CardBody>
            Appwrite database that allows every indavidual user to have their own personal Todo List.
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              radius="md" 
              // className="bg-gradient-to-tr from-danger-400 to-danger-200 text-default-800 shadow-lg m-auto"
              className="m-auto"
              variant="flat"
              onClick={() => router.push('/profile/todo')}
            >
              Go to Todo List
            </Button>
          </CardFooter>
        </Card>

        <Card className="max-w-[350px] ml-3 bg-gradient-to-tr from-danger-300 from-40% to-danger-200 to-80%">
          <CardHeader>
            YOUR PERSONAL TBD IDK
          </CardHeader>
          <Divider />
          <CardBody>
            there will besomething here at somepoint hopefully sure hopefulle yea thats sometyhing that should be here. what will it be??? who knows maybe something with storage or functions
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              radius="md" 
              // className="bg-gradient-to-tr from-danger-400 to-danger-200 text-default-800 shadow-lg m-auto"
              className="m-auto"
              variant="flat"
              onClick={() => router.push('/')}
            >
              Go to Something
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}