"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

import { MoonIcon } from "./MoonIcon";
import { SunIcon }from './SunIcon'

export function ThemeSwitcher () {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Switch
      defaultSelected
      size='lg'
      color='danger'
      isSelected={theme === 'dark'}
      onValueChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      startContent={<MoonIcon />}
      endContent={<SunIcon />}
    />
  )
}