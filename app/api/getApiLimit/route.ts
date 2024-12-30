// File: /app/api/getApiLimit/route.ts or /pages/api/getApiLimit.ts
import { NextResponse } from "next/server";
import { getApiLimitCount } from "@/lib/api-limit";
import { revalidatePath } from "next/cache";

export async function GET() {
    const apiLimit = await getApiLimitCount();

    return NextResponse.json({ apiLimit });
    
}
