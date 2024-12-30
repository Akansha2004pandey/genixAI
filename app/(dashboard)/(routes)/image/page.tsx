"use client"
import React from 'react'
import Heading from '@/components/Heading'
import {useForm} from "react-hook-form";
import {Image as IconImage, MessageSquare, User} from 'lucide-react'
import axios from "axios";
import * as z from "zod";
import {useRouter} from "next/navigation";
import {formSchema} from './constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Image from 'next/image';
import {useState} from "react";
import UserAvatar from '@/components/userAvatar';
import Loader from '@/components/ui/loader';
import BotAvatar from '@/components/BotAvatar';
import Markdown from 'react-markdown';
import { Select, SelectValue , SelectContent, SelectTrigger, SelectItem} from '@/components/ui/select';
import { amountOptions, resolutionOptions} from './constants'; 
const ImagePage = () => {
    const router=useRouter();
   const [images,setImages]=useState<string[]>([]);
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
           defaultValues:{
            prompt:"",
            amount:"1",
            resolution:"512x512"
               
           }
    })
    const isLoading=form.formState.isSubmitting;
    const  onSubmit=async (values:z.infer<typeof formSchema>)=>{
        try{
            setImages([]);
            console.log(values);

            const response=await axios.post("/api/image",values);
            console.log(response);
            const urls= response.data.urls;
            setImages(urls);
            
            form.reset();
        }
        catch(error){
            console.log("hello there is some problem")
            console.log(error);
        }
        finally{
             router.refresh();
        } 
    }

  return (
    <>
    <div>
       <Heading
       title="Image Generation"
       description="Our most advanced conversation model"
       icon={IconImage}
       iconColor="text-pink-700"
       bgColor="bg-pink-500/10"
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
                    <FormItem className="col-span-12 lg:col-span-6">
                        <FormControl className="m-0 p-0">

                              <Input 
                               className="
                               border-0 outline-none focus-visible:ring-0 
                               focus-visible:ring-0 
                               focus-visible:ring-transparent
                               "
                               disabled ={isLoading}
                               placeholder="A picture of a horse"
                               {...field} 
                               />
                        </FormControl>
                        </FormItem>
                        );
                    }}/>
                    <FormField control={form.control} name="amount"
                    render={({field})=>{
                       return (
                         <FormItem className='col-span-12 lg:col-span-2'>
                           <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                             <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                             </FormControl>
                             
                             <SelectContent>
                               {amountOptions.map((option) => (
                                 <SelectItem key={option.value} value={option.value}>
                                   {option.label}
                                 </SelectItem>
                               ))} 
                             </SelectContent>
                           </Select>
                         </FormItem>
                       )
                    }}/>
                      <FormField control={form.control} name="resolution"
                    render={({field})=>{
                       return (
                         <FormItem className='col-span-12 lg:col-span-2'>
                           <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                             <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                             </FormControl>
                             
                             <SelectContent>
                               {resolutionOptions.map((option) => (
                                 <SelectItem key={option.value} value={option.value}>
                                   {option.label}
                                 </SelectItem>
                               ))} 
                             </SelectContent>
                           </Select>
                         </FormItem>
                       )
                    }}/>
                        <Button className="col-span-12 lg:col-span-2">
                            Generate 
                        </Button>
                        </form>
                    </Form>
            </div>
            <div className="space-y-4 mt-4 pb-10">
              {isLoading && <Loader/>}
              <div>
  {images.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((url, index) => (
         <div 
         key={index} 
         className="
           relative 
           overflow-hidden 
           rounded-lg 
           shadow-lg 
           hover:scale-105 
           transition 
           duration-300 
           ease-in-out
         "
       >
        <Image
          key={index} 
          src={url} 
          width={500}
          height={500}
          alt={`Generated image ${index + 1}`}
        />
        <div
            className="
              absolute 
              inset-0 
              bg-gradient-to-t 
              from-black/60 
              via-transparent 
              to-transparent 
              opacity-0 
              hover:opacity-100 
              transition-opacity 
              duration-300
            "
          >
            <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
              Image {index + 1}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


        
            </div>
       </div>
       
    </div>
    </>
  );

}

export default ImagePage
