import { checkSubscription } from "@/lib/subscription"
import Heading from "@/components/Heading"
import { Settings} from "lucide-react"
import { SubscriptionButton } from "@/components/subscription-button";
const SettingsPage=async ()=>{
    const isPro=await checkSubscription();
   
    return (
    <div>
        <Heading
         title="Settings"
         description="Manage Account Settings."
         icon={Settings}
         iconColor="text-gray-700"
         bgColor="bg-gray-200"
         />
         <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {isPro? "You are currently on the Pro plan.":"You are currently on the Free plan."}
            </div>
            <SubscriptionButton isPro={isPro}/>

         </div>

    </div>
    )
}
export default SettingsPage