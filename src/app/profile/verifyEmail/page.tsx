'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type params = {
  userId: string | null,
  secret: string | null,
  expire: string | null
}

export default function verifyEmailPage() {
  const router = useRouter()
  // const [verificationParams, setVerificationParams] = useState<params>({
  //   userId: "",
  //   secret: "",
  //   expire: "",
  // })

  // verification paramaters passed through the url
  const params = useSearchParams()

  // const getVerificationParams = () => {
  //   setVerificationParams({
  //     userId: params.get('userId'),
  //     secret: params.get('secret'),
  //     expire: params.get('expire')
  //   })
  // }

  const getVerificationParams = () => {
    return {
      userId: params.get('userId'),
      secret: params.get('secret'),
      expire: params.get('expire')
    }
  }

  const verifyEmail = async (verifyParams: params) => {
    try {
      const response = await axios.put('/api/users/verifyEmail', verifyParams)
      // toast.success("Successfully Verified Email")
      router.push('/profile')
    }
    catch (error: any) {
      // toast.error(error.response.data)
    }
  }

  // get paramaters on load of the page
  // then call verification api route
  useEffect(() => {
    const params = getVerificationParams()

    verifyEmail(params)
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background
    absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
    bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-65% text-default-800">
      <p>hello</p>
    </div>
  )
}