"use client";
import React, { useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Music } from "lucide-react";

const AudioPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined); // Clear previous music state

      const response = await axios.post("/api/audio", {
        prompt: value.prompt,
      });

      console.log("Response from backend:", response.data);
      setMusic(response.data.audio); // Assuming audio is a Base64 string or valid URL
      form.reset();
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Audio Generation"
          description="Turn Your Prompt into audio"
          icon={Music}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
        />
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                "
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl>
                        <Input
                          className="
                            border-0
                            outline-none
                            focus-visible:ring-0
                          "
                          disabled={isLoading}
                          placeholder="Piano Solo"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 lg:col-span-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4 pb-10">
            {isLoading && <Loader />}
            {music && (
              <div>
                <audio controls className="w-full mt-8">
                  <source src={music} type="audio/mp3" />
                </audio>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPage;
