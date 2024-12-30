"use client";
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from 'next/font/google'
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import { FreeCounter } from "./FreeCounter";
const montserrat=Montserrat({ weight:"600",
    subsets:["latin"]
})
const routes=[
  {
    label:"Dashboard",
    icon:LayoutDashboard,
    href:"/dashboard",
    color:"text-sky-500",
  },
  {
    label:"Conversation",
    icon:MessageSquare,
    href:"/conversation",
    color:"text-violet-500",
  },
  {
    label:"Image Generation",
    icon:ImageIcon,
    href:"/image",
    color:"text-pink-700",
  },
  {
    label:"Video Generation",
    icon:Video,
    href:"/video",
    color:"text-orange-500",
  },
  {
    label:"Audio Generation",
    icon:Music,
    href:"/audio",
    color:"text-emerald-500",
  },
  {
    label:"Code Generation",
    icon:Code,
    href:"/code",
    color:"text-green-500",
  },{
    label:"Settings",
    icon:Settings,
    href:"/settings",
    
  },
]
interface SideBarProps {
  apiLimit:number;
}
const SideBar = ({apiLimit=0}:SideBarProps) => {
  
  const pathName=usePathname();

   console.log("apiLimit",apiLimit);

  return (
    <div className="spac-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
       <div className="px-3 py-2 flex-1">
         <Link href="/dashboard" className="flex items-center pl-3 mb-14">
         <div className="relative w-8 h-8 mr-4">
            
            <Image
              fill 
              alt="Logo"
              src="/Logo.webp"
            /></div>
            <h1 className={cn("text-2xl font-bold",montserrat.className)}>GenixAI</h1>
            </Link>
            <div>
              {routes.map((route)=>(
                <Link key={route.href} href={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathName===route.href?"text-white bg-white/10":"text-zinc-400")}>
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3",route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
       </div>
        
       <FreeCounter apiLimit={apiLimit}/>
    </div>
  )
}

export default SideBar
