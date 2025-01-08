import React from 'react'
import { Button } from './ui/button'
import { Menu, User } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async () => {
  const apiLimitCount=await getApiLimitCount();
  const isPro=await checkSubscription();
  return (
    <div className='flex items-center p-4'>
      <div className='md:hidden'>    <MobileSidebar apiLimit={apiLimitCount} isPro={isPro}/></div>
 
      <div className='flex w-full justify-end'>
        <UserButton /> 
      </div>
    </div>
  )
}

export default Navbar
