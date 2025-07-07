import clientPromise from "@/lib/mongodb";
import {NextResponse} from "next/server";
export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("Xtrack");
    const collection = db.collection("users");
   await collection.updateOne(
      {phone: body.phone},
      {$set: {password: body.cpassword}}

    );
       return NextResponse.json({ error: "false", message: "password changed sucessfully" })

  } catch (error) {
    console.error(" Error:", error);
    return NextResponse.json({
      error: true,
      message: "Internal server error",
    });
  }
}
