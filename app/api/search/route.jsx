import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";
export async function POST(request) {
    try{
 const body = await request.json()
    const client = await clientPromise;
    const db = client.db("Xtrack")
    const collection = db.collection("users")
    const user = await collection.findOne({ phone: body.phone })
    if(user){
        return NextResponse.json({ error: "false", message: "User found", user })
    }
    else{
        return NextResponse.json({ error: "true", message: "User not found" })
    }
    }
    catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
          error: true,
          message: "Internal server error",
        });
      }
}