import{useState, useEffect} from "react"
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout =async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    
    const apiLimit=await getApiLimitCount();
    console.log(apiLimit);
    return (
        <div className="h-full relative">
           <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <SideBar apiLimit={apiLimit}/>
           </div>
           <main className="md:pl-72">
           
            <Navbar/>
            {children}
           </main>
       
        </div>
    );
};
export default DashboardLayout;