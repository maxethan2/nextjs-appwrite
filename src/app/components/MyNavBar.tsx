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
import { Button, BreadcrumbItem, Breadcrumbs  } from "@nextui-org/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useRouter, usePathname } from "next/navigation"; 
import Link from "next/link";



export default function MyNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/api/users/loggedInUser')
        setUser(response.data.user)
      }
      catch (error: any) {
        console.log(error.message)
        setUser(null)
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

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem onClick={() => router.push('/')}>Home</BreadcrumbItem>
      {pathname === '/profile' && <BreadcrumbItem>Profile</BreadcrumbItem>}

      {pathname === '/login' && <BreadcrumbItem>Login</BreadcrumbItem>}
      {pathname === '/signup' && <BreadcrumbItem>Signup</BreadcrumbItem>}

      {pathname === '/profile/todo' && (
        <>
          <BreadcrumbItem>Profile</BreadcrumbItem>
          <BreadcrumbItem>Todo</BreadcrumbItem> 
        </>
      )}
    </Breadcrumbs>
  )

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />

      <Navbar position="static" isBordered className='flex flex-row items-center justify-center bg-default-100'>
        <NavbarContent>
          {breadcrumbs}
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
    </div>
  )
}