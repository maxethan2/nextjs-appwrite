'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardBody, CardFooter, Divider, Image, Skeleton, Button,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import toast from "react-hot-toast";
import EditProfile from "./components/EditProfile";

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(true)
  // states for the modal element
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

  const verifyEmail = async () => {
    try{
      const response = await axios.post('/api/users/verifyEmail')
      toast.success("Email Verification Has Been Sent To Your Email", 
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        }
      )
    }
    catch (error: any) {
      toast.error(`Failed to verify email.\n${error.response.data.error.type}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background
    absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
    bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-65% text-default-800">
      <Card className="max-w-[600px]">
        <CardHeader className="flex flex-row gap-3">
          <Image 
            alt="Profile Picture"
            loading="eager"
            src='/shyguy.png'
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
              <DropdownItem key="new" onPress={verifyEmail}>Verify Email</DropdownItem>
              <DropdownItem key="copy">Verify Phone</DropdownItem>
              <DropdownItem key="edit" onPress={onOpen}>Edit Profile</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete Account
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        {/* modal element */}
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange} 
          isDismissable={false} 
          isKeyboardDismissDisabled={true}
          backdrop="opaque"
          classNames={{
            backdrop: "bg-gradient-to-t from-danger-400/50 to-zinc-900/10 backdrop-opacity-20"
          }}  
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col m-auto">Edit Profile</ModalHeader>

                <ModalBody>
                  <EditProfile />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="shadow" onPress={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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