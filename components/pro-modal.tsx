"use client";

import { useStore } from "zustand";
import { Dialog , DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModalStore } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { MessageSquare, Music, ImageIcon, VideoIcon, Code, Check, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
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
      href:"/music"
    },
    {
      label:"Image Generation",
      icon:ImageIcon,
      color:"text-pink-500",
      bgColor:"bg-pink-500/10",
      href:"/image"
    },
    {
      label:"Video Generation",
      icon:VideoIcon,
      color:"text-orange-500",
      bgColor:"bg-orange-500/10",
      href:"/video"
    },
    {
      label:"Code Generation",
      icon:Code,
      color:"text-green-500",
      bgColor:"bg-green-500/10",
      href:"/conversation"
    }
  ]
export const ProModal = () => {
   const proModal=useProModalStore();
    return (
        <>
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
             <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4
                    pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to GenixAi
                        <Badge variant={"premium"} className="uppercase text-sm py-1">
                            pro
                        </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                       {tools.map((tool)=>{
                        return (
                          <>
                          <Card key={tool.label} className="
                          p-3 border-black/5 flex items-center justify-between 
                          ">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6",tool.color)} />
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5"/>
                          </Card>
                          </>
                        )
                      })}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-full"
                    size="lg" variant="premium">Upgrade
                        <Zap className="ml-2 h-4 w-4 fill-white"/>
                    </Button>
                </DialogFooter>

             </DialogContent>
        </Dialog>
        </>

    )
};