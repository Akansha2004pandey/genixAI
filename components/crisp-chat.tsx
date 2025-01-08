"use client"
import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web";

export const CrispChat=()=>{
     useEffect(()=>{
        Crisp.configure("dfacd033-8cee-4ae8-852e-ce1cac85cd14")
     },[]);
     return null;
}