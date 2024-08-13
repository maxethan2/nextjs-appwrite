"use client"
import Link from "next/link"

import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from '@nextui-org/react'
import { useRouter } from "next/navigation"
import { TextEffect } from "@/motion-primitives/text-effect"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-default-50 from-10% to-danger-200 to-65% text-default-800">
      
      <TextEffect 
        per='word'
        as='h3'
        preset="blur"
        className="text-3xl mb-8 -mt-32 font-extrabold"
      >
        Come&nbsp;Learn&nbsp;Appwrite&nbsp;With&nbsp;Me!
      </TextEffect>
      
      <Card className='bg-content1 max-w-[400px]' isBlurred={true}>
        <CardHeader>
          <h1 className="text-xl">Welcome to my Appwrite Project</h1>
          <Image  src="./Appwrite.png" width={50} className="ml-3"/>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2>
            The goal of this project is to learn to use the Appwwrite Database, Auth, and Storage functionality.
          </h2>
        </CardBody>
        <Divider />
        <CardFooter>
          <h2>View some stuff</h2>
        </CardFooter>
      </Card>

      <div className="flex flex-row mt-3">
        <Card
          className="max-w-[350px] hover:cursor-pointer"
          isFooterBlurred
        >
          <CardHeader className="flex-col !items-start z-10 top-1 absolute">
            <p className="text-tiny text-white/80 uppercase font-bold">Personal Todo List</p>
            <h4 className="text-white font-medium text-large">Keep Track Of Your Thoughts</h4>
          </CardHeader>
          <Image 
            removeWrapper
            alt='Todo List Card Background'
            src="./todo-list.jpg"
            // width={350}
            className="z-0 w-full h-full object-cover"
          />

          <CardFooter className="absolute bottom-0 bg-white/20 text-black border-t-1 border-zinc-100/50">
            <div>
              <p>Visit Your Personal Todo List</p>
            </div>
            <Button
              className="ml-3 max-w-[10px]"
              variant="shadow"
              color='danger'
              onClick={() => router.push('/profile/todo')}
            >
              Visit
            </Button>
          </CardFooter>
        </Card>

        <Card
          className="max-w-[350px] hover:cursor-pointer ml-3"
          isFooterBlurred
        >
          <CardHeader className="flex-col !items-start z-10 top-1 absolute">
            <p className="text-tiny text-white/80 uppercase font-bold">More To Come</p>
            <h4 className="text-white font-medium text-large">What???</h4>
          </CardHeader>
          <Image 
            removeWrapper
            alt='Todo List Card Background'
            src="./question-mark.jpg"
            // width={350}
            className="z-0 w-full h-full object-cover"
          />

          <CardFooter className="absolute bottom-0 bg-white/20 text-black border-t-1 border-zinc-100/50">
            <div className="flex flex-row justify-between items-center">
              <p>Visit Nothing</p>
              <Button
                className="ml-3 max-w-[10px]"
                variant="shadow"
                color='danger'
                onClick={() => router.push('/thispagedoesnotexist')}
                >
                  Visit
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
