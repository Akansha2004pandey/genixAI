"use client"
import React from 'react'
import Heading from '@/components/Heading'
import {useForm} from "react-hook-form";
import {Code} from 'lucide-react'
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import {useRouter} from "next/navigation";
import {formSchema} from './constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ChatCompletionRequestMessage} from "openai";
import {useState} from "react";
import UserAvatar from '@/components/userAvatar';
import Loader from '@/components/ui/loader';
import BotAvatar from '@/components/BotAvatar';
import Markdown from "react-markdown";
import { useProModalStore } from '@/hooks/use-pro-modal';
const CodePage = () => {
    const router=useRouter();
    const proModal=useProModalStore();
    const [messages,setMessages]=useState<ChatCompletionRequestMessage[]>([]);
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
           defaultValues:{
            prompt:""
               
           }
    })
    const isLoading=form.formState.isSubmitting;
    const  onSubmit=async (value:z.infer<typeof formSchema>)=>{
        try{ 
             
             const userMessage:ChatCompletionRequestMessage={
                role:"user",
                content:value.prompt
            };
            const newMessages=[...messages,userMessage];
            const response=await axios.post("/api/code",{
                messages:newMessages
            });
            console.log("hello");
            const assistantMessage = response.data.message;

    setMessages((current) => [
      ...current,
      userMessage,
      { role: "assistant", content: assistantMessage }
    ]);
        console.log(messages);
            form.reset();
        }
        catch(error){
            console.log("hello there is some problem")
            console.log(error);
            if(error?.response?.status===403){
              proModal.onOpen();

          } else{
             toast.error("Something went wrong");
          }
        }
        finally{
             router.refresh();
        } 
    }

  return (
    <>
    <div>
       <Heading
       title="Code Generation"
       description="Generate code from descriptinve text"
       icon={Code}
       iconColor="text-green-700"
       bgColor="bg-green-500/10"
       />
       <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                 
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                    ">
                    <FormField name="prompt" 
                    render={({field})=>{
                        return (
                    <FormItem className="col-span-12 lg:col-span-10">
                        <FormControl className="m-0 p-0">

                              <Input 
                               className="
                               border-0 outline-none focus-visible:ring-0 
                               focus-visible:ring-0 
                               focus-visible:ring-transparent
                               "
                               disabled ={isLoading}
                               placeholder="Simple toggle button using react hooks"
                               {...field} 
                               />
                        </FormControl>
                        </FormItem>
                        );
                    }}/>
                        <Button className="col-span-12 lg:col-span-12">
                            Generate 
                        </Button>
                        </form>
                    </Form>
            </div>
            <div className="space-y-4 mt-4 pb-10">
              {isLoading && <Loader/>}
            <div className="flex flex-col gap-y-4">
  {messages.map((message, index) => {
    const isUserMessage = message.role === "user";
    return (
      <div
        key={index}
        className={`
          flex ${isUserMessage ? "justify-end" : "justify-start"}
        `}
      >
        <div className='flex px-2 items-start '>{isUserMessage? <UserAvatar />:<BotAvatar/>}</div>
        <div
  className={`
    max-w-[75%]
    p-4
    text-sm
    rounded-lg
    shadow-md
    break-words
    whitespace-pre-wrap
    overflow-auto
    ${isUserMessage 
      ? "bg-violet-500 text-white rounded-br-none" 
      : "bg-gray-200 text-gray-800 rounded-bl-none"}
  `}
>
  <Markdown className="break-words whitespace-pre-wrap overflow-auto">{message.content}</Markdown>
</div>

      </div>
    );
  })}
</div>

        
            </div>
       </div>
       
    </div>
    </>
  );

}

export default CodePage
