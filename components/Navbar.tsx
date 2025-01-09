import React from 'react'
import { Button } from './ui/button'
import { Menu, User } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async ({apiLimit,isPro}:{apiLimit:number,isPro:boolean})=>{
 
  return (
    <div className='flex items-center p-4'>
      <div className='md:hidden'>    <MobileSidebar apiLimit={apiLimit} isPro={isPro}/></div>
 
      <div className='flex w-full justify-end'>
        <UserButton /> 
      </div>
    </div>
  )
}

export default Navbar
