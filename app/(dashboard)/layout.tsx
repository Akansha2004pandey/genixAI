import{useState, useEffect} from "react"
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout =async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    
    const apiLimit=await getApiLimitCount();
    const isPro=await checkSubscription();
    console.log(apiLimit,"dashboard");
    return (
        <div className="h-full relative">
           <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <SideBar apiLimit={apiLimit} isPro={isPro}/>
           </div>
           <main className="md:pl-72">
           
            <Navbar apiLimit={apiLimit}/>
            {children}
           </main>
       
        </div>
    );
};
export default DashboardLayout;