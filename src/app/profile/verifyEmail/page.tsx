'use client'
import { Suspense } from 'react'
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type params = {
  userId: string | null,
  secret: string | null,
  expire: string | null
}

function VerifyEmailContent() {
  const router = useRouter();
  const params = useSearchParams();

  const getVerificationParams = (): params => {
    return {
      userId: params.get('userId'),
      secret: params.get('secret'),
      expire: params.get('expire'),
    };
  };

  const verifyEmail = async (verifyParams: params) => {
    try {
      const response = await axios.put('/api/users/verifyEmail', verifyParams);
      // toast.success("Successfully Verified Email");
      router.push('/profile');
    } catch (error: any) {
      // toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verificationParams = getVerificationParams();
      if (verificationParams.userId && verificationParams.secret && verificationParams.expire) {
        verifyEmail(verificationParams);
      } else {
        console.error("Missing parameters");
      }
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background
      absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
      bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-default-50 from-10% to-danger-200 to-65% text-default-800">
      <p>hello</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
