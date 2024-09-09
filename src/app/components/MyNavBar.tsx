'use client'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useRouter, usePathname } from "next/navigation"; 
import Link from "next/link";
import { useUserState } from "@/lib/server/state-management/state";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function MyNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User>(useUserState((state) => state.user))
  const userProfilePicUrl = useUserState((state) => state.profilePicUrl)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [chevronState, setChevronState] = useState({
    profile: false,
    tbd: false
  })

  useEffect(() => {
    const getLoggedInUser = async () => {
      fetchData: try {
        // if user data is already fetched then dont fetch again
        if (user.$id != 'none') break fetchData

        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)

        // fetch the user profile photo if it hasnt been fetched already
        // 
        if (userProfilePicUrl == ''){
          const response = await axios.get('api/users/profilePhoto')
          useUserState.setState({profilePicUrl: response.data.imageUrl})
        }
      }
      catch (error: any) {
        console.log(error.message)
      }
    }
    getLoggedInUser()
  }, [pathname])

  const handleButtonClick = async () => {
    // if a user exists handle signout function
    if (user) {
      try {
        const response = await axios.get('/api/users/signout')
        toast.success(response.data.message)
        router.push('/')
      }
      catch (error: any) {
        const errorResponse = `Signout Failed: ${error.response.data.error}`
        toast.error( errorResponse)
      }
    }
    // no user exists so route to signup
    else {
      router.replace('/signup')
    }
    
  }

  return (
    // <div className="flex flex-col items-center justify-center">
      // <Toaster />

      <Navbar 
        // position="static" 
        isBlurred={true}
        isBordered={true}
        // className='flex flex-row items-center justify-center bg-default-100 m-0 p-0'
        className='fixed top-0 left-0 w-full z-50 bg-default-100 bg-opacity-60 flex flex-row items-center justify-center m-0 p-0'
        >

        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden" />
          <Link
            href='/'
          >
            <div className="">
              <Image 
                isBlurred
                isZoomed
                width={70}
                loading="eager"
                src='/shyguy.png'
                alt='Shy Guy Icon'
                className="hover:cursor-pointer"
              />
            </div>
          </Link>
          <h1 className='font-bold'>Appwrite Project</h1>
        </NavbarContent>

        <NavbarContent>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={chevronState.profile ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  // onClick={() => setChevronState(prevChevronState => (
                  //   {
                  //     ...prevChevronState,
                  //     profile: !prevChevronState.profile
                  //   }
                  // ))}
                  radius="sm"
                  variant="light"
                >
                  Profile
                </Button>
              </DropdownTrigger>
            </NavbarItem>

            <DropdownMenu
              aria-label="Profile Features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key='profile'
                description="Your personal profile where you can manage your account and data."
                startContent={<AccountCircleIcon className="text-danger-400" fontSize="large"/>}
                onClick={() => router.push('/profile')}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key='todo list'
                description="Specific Todo List for you to keep track of all your ideas."
                startContent={<FormatListBulletedIcon className="text-danger-400" fontSize="large"/>}
                onClick={() => router.push('/profile/todo')}
              >
                Todo List
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<KeyboardArrowDownIcon />}
                  radius="sm"
                  variant="light"
                >
                  TBD
                </Button>
              </DropdownTrigger>
            </NavbarItem>

            <DropdownMenu
              aria-label="Profile Features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key='autoscalling'
                description="Something will be added here eventually ??omething will be added here eventually ??omething will be added here eventually ??omething will be added here eventually ???"
                startContent={<QuestionMarkIcon className="text-danger-400" fontSize="large"/>}
                onClick={() => router.push('/')}
              >
                Something
              </DropdownItem>
              <DropdownItem
                key='autoscalling'
                description="Yea for sure something will be added here in the future"
                startContent={<QuestionMarkIcon className="text-danger-400" fontSize="large"/>}
                onClick={() => router.push('/')}
              >
                Future Stuff
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>

        </NavbarContent>

        <NavbarContent>
          <Toaster />
        </NavbarContent>

        <div>
          <NavbarContent className="m-auto">
            <Button
              color='danger'
              variant="shadow"
              onClick={handleButtonClick}
            >
              {user ? "Signout" : "Signup"}
            </Button>
            <ThemeSwitcher />
          </NavbarContent>
        </div>

      </Navbar>
    // </div>
  )
}