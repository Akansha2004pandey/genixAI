"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { MessageSquare, Music, ImageIcon, VideoIcon, Code } from 'lucide-react'
import {Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader} from './ui/card'
const testimonials=[
    {
        name:"Akshita Kalsi",
        avatar:"A",
        title:"Student",
        description:"This is the best application I've used"
    },
    {
        name:"Akshita Kalsi",
        avatar:"A",
        title:"Student",
        description:"This is the best application I've used"
    },
    {
        name:"Akshita Kalsi",
        avatar:"A",
        title:"Student",
        description:"This is the best application I've used"
    },
    {
        name:"Akshita Kalsi",
        avatar:"A",
        title:"Student",
        description:"This is the best application I've used"
    },
    {
        name:"Akshita Kalsi",
        avatar:"A",
        title:"Student",
        description:"This is the best application I've used"
    },
]
const LandingContent = () => {
   return (
       <div className='px-10 pb-20'>
         <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
            Testimonials
         </h2>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                      {testimonials.map((item)=>{
                        return (
                            <>
                            <Card key={item.description} className='bg-[#231b47] border-none text-white m-2'>
                                <CardHeader>
                                     <CardTitle className='flex items-center gap-x-2'>
                                        <div><p className='text-lg'>{item.name}</p>
                                        <p className='text-zinc-400 text-sm'>{item.title}</p></div>
                                     </CardTitle>
                                     <CardContent className='text-sm text-zinc-400 pt-4 px-0'>
                                         <p >{item.description}</p>
                                     </CardContent>
                                </CardHeader>
                            </Card>
                            </>
                        )
                      })}
         </div>
       </div>
   )
}
export default LandingContent;