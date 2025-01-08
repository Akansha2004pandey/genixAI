"use client"
import React, { useState,useEffect } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger ,SheetContent} from '@/components/ui/sheet' 
import SideBar from './SideBar'
import { ApiError } from 'next/dist/server/api-utils'
interface MobileSideBarProps {
  apiLimit:number;
  isPro: boolean;
}
const MobileSidebar = ({apiLimit=0, isPro=false}:MobileSideBarProps) => {
    const [isMounted, setIsMounted] = React.useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);

  if (!isMounted) return null;
  
  return (
    
        <Sheet>
            <SheetTrigger>
       <Button variant="ghost" size="icon" className='md:hidden'>
          <Menu/>
       </Button>
       </SheetTrigger>
       <SheetContent side="left" className='p-0' >
        <SideBar apiLimit={apiLimit} isPro={isPro}/>
       </SheetContent>
       </Sheet>
    
  )
}

export default MobileSidebar
