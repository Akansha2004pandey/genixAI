import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { increaseApiLimit } from "@/lib/api-limit";
import { checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
// Ensure you use process.env for environment variables
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,
  tools: [
    {
      codeExecution: {},
    },
  ],
});
  
export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.GENAI_API_KEY) {
      return new NextResponse("GENAI API Key not found", { status: 500 });
    }

    if (!messages || messages.length === 0) {
      return new NextResponse("Messages not found", { status: 400 });
    }
    const freeTrial=await checkApiLimit();
    const checkSubscriptionStatus=await checkSubscription();

    
    if(!freeTrial && !checkSubscriptionStatus){
        return new NextResponse("Free trial limit reached", { status: 403 });
    }

    // Assuming messages is an array of message objects that contain content
    const prompt = messages[messages.length - 1].content;  // Take the last message's content

    const result = await model.generateContent(prompt);
    const generatedMessage = result.response?.text() || "No response generated";
    console.log("Generated message:", generatedMessage);
    await increaseApiLimit();
    return new NextResponse(JSON.stringify({ message: generatedMessage }), { status: 200 });
  } catch (error) {
    console.error("Code error occurred:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
