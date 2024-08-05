import Link from "next/link"

export default async function Home() {

  return (
    <div className="min-h-screen bg-default-50 flex flex-col items-center justify-center">
      <h1>HomePage LOL</h1>
      <Link href='/profile'>
        <div className="bg-default-200 hover:bg-default-300 hover:border-default-700 border-default-600 border-1 rounded-lg p-2 flex flex-col items-center justify-center transition-all">
          <div className="m-auto">
            Profile
          </div>
          <div className="m-auto text-xs">
            Go to Profile
          </div>
        </div>
      </Link>
    </div>
  )
}
