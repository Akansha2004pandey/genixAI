"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Sign } from "crypto";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
const tools=[
  {
    label:"Conversation",
    icon:MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    href:"/conversation"
  },
  {
    label:"Music Generation",
    icon:Music,
    color:"text-emerald-500",
    bgColor:"bg-emerald-500/10",
    href:"/audio"
  },
  {
    label:"Image Generation",
    icon:ImageIcon,
    color:"text-pink-500",
    bgColor:"bg-pink-500/10",
    href:"/image"
  },
  {
    label:"Code Generation",
    icon:Code,
    color:"text-green-500",
    bgColor:"bg-green-500/10",
    href:"/conversation"
  }
]
export default function DashboardPage() {
  const router=useRouter();
  return (
    
    <>
    <div>
     <div className="mb-8 space-y-4">
       <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore the power of AI
       </h2>
       <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Chat with the smartest AI- experience the power of AI
          
       </p>
     </div>
     <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool)=>{
            return (
              <Card onClick={()=>{router.push(tool.href)}} key={tool.href}
               className="p-4 border-black/5 flex items-center justify-between hover:shadow-md 
               transition cursor-pointer">
                <div className="flex items-center gap-x-4">
                   <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                   <tool.icon className={cn("h-8 w-8",tool.color)} />
                   </div>
                   <div className="font-semibold">
                    {tool.label}
                   </div>
                </div>
                <ArrowRight className="h-5 w-5" />
               </Card>
            )
          })}
     </div>
       
     </div>
     </>
     
  );
}
