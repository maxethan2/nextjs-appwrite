import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation"; 
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function MyNavbar() {

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />

      <Navbar position="static" isBordered className='flex flex-row items-center justify-center bg-default-100'>
        <NavbarContent>
          Hello
        </NavbarContent>

        <NavbarContent className="m-auto">
          <ThemeSwitcher />
        </NavbarContent>
      </Navbar>
    </div>
  )
}