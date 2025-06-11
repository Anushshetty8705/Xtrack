import { NextResponse } from 'next/server';
import clientPromise from "@/lib/Mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("Xtrack");
    const collection = db.collection("users");

    const user = await collection.findOne({
      username: body.username,
      password: body.password,
    });

    if (user) {
      return NextResponse.json({ error: false, message: "success" });
    }

    return NextResponse.json({
      error: true,
      message: "User does not exist",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({
      error: true,
      message: "Internal server error",
    });
  }
}
