import React from 'react'
import { Button } from './ui/button'
import { Menu, User } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
interface NavbarProps{
  apiLimit:number;
}
const Navbar = ({apiLimit=0}:NavbarProps) => {
  return (
    <div className='flex items-center p-4'>
      <div className='md:hidden'>    <MobileSidebar apiLimit={apiLimit}/></div>
 
      <div className='flex w-full justify-end'>
        <UserButton/> 
      </div>
    </div>
  )
}

export default Navbar
