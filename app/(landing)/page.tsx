import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
const LandingPage = () => {
  return (
    <div>
       LandinPage
       <div>
        <Link href="/sign-in">
        <Button>
Login
        </Button>
        </Link>
        <Link href="/sign-up ">
        <Button> 
            Register
        </Button>
        </Link>
        
       </div>
    </div>
  )
}

export default LandingPage
