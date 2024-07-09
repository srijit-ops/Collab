import { Medal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

function page() {
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex items-center justify-center flex-col'>
            <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                <Medal className='h-6 w-6 mr-2'/>
                No. 1 Collaboration Platform
            </div>
            <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>Collab helps team move.</h1>
            <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md pb-4 text-white px-4 p-2 w-fit'>Work forward.</div>
        </div>
        <div className='text-sm md:text-xl text-neutral-400 mt-4 text-center max-w-xs md:max-w-2xl mx-auto'>
            Collaborate, Manage projects, and reach new productivity peaks. Collaborate, manage projects, and reach new productivity peaks. Collaborate, manage projects, and reach new productivity peaks.
        </div>
        <Button className='mt-6' size="lg" asChild>
            <Link href={"/sign-up"}>
            Get Collab for free
            </Link>
        </Button>
    </div>
  )
}

export default page