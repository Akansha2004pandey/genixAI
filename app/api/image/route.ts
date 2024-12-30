import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { storage } from "../../../lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cloudinary from "../../../lib/cloudinary";
import { increaseApiLimit } from "@/lib/api-limit";
import { checkApiLimit } from "@/lib/api-limit";
export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // Authorization check
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

   const freeTrial=await checkApiLimit();
    if(!freeTrial) {
        return new NextResponse("Free trial limit reached", { status: 403 });
    } 
    const [width, height] = resolution.split("x").map(Number);
    if (isNaN(width) || isNaN(height)) {
      return new NextResponse("Invalid resolution format", { status: 400 });
    }

    const targetSize = [width, height];
    const urls = [];

    console.log("hello akku");
    for (let i = 0; i < amount; i++) {

      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt, // Send prompt directly as the string in 'inputs'
            width: targetSize[0],
            height : targetSize[1], 
          }),
        }
      );
      console.log(response, "I am response");
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Hugging Face API Error:", errorMessage);
        return new NextResponse("Failed to generate result", { status: 500 });
      }

      const resultBlob = await response.blob();
      console.log(resultBlob, "I am result blob");
      
      const buffer = await resultBlob.arrayBuffer();
        const bufferData = Buffer.from(buffer);
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "blog-website" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(bufferData);
        });
  
        // Store the URL in the array
        urls.push(uploadResult.secure_url);
        console.log(urls);
      
    }
      await increaseApiLimit();
    // Return the array of URLs
    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error("Error occurred:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
