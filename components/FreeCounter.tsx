"use client"
import React, { useState,useEffect } from 'react'
import { Card , CardContent} from './ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'

interface FreeCounterProps{
   apiLimit:number;
}
export const FreeCounter = ({apiLimit=0}:FreeCounterProps) => {
  
  console.log(apiLimit,"free counter");
  console.log(apiLimit);
  return (
    <div className='px-3'>
       <Card className='bg-white/10 border-0'>
       <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
             className='h-3'
             value={(apiLimit / MAX_FREE_COUNTS) * 100}
            />


          </div>
          <Button className='w-full' variant={'premium'}>
            Update
            <Zap className='ml-2 h-4 w-4 fill-white'/>
          </Button>

        </CardContent></Card>
    </div>
  )
}


