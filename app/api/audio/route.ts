import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { ElevenLabsClient, stream } from "elevenlabs";
import { Readable } from "stream";
import { increaseApiLimit } from "@/lib/api-limit";
import { checkApiLimit } from "@/lib/api-limit";
const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    const freeTrial=await checkApiLimit();
    if(!freeTrial) {
        return NextResponse.json({ error: "Free trial limit reached" }, { status: 403 });
    }

    const audioStream = await client.textToSpeech.convertAsStream(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        
        text:prompt,
        model_id: "eleven_multilingual_v2",
      }
    );
    console.log("hello from server");

    const audioBuffers = [];
    for await (const chunk of audioStream) {
      audioBuffers.push(chunk);
    }
    console.log("buffer problem");
    const audioBuffer = Buffer.concat(audioBuffers);
    const audioBase64 = audioBuffer.toString("base64");
    await increaseApiLimit();
    return NextResponse.json({ audio: `data:audio/mp3;base64,${audioBase64}` });
  } catch (error) {

    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}