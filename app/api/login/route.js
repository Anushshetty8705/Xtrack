import clientPromise from "@/lib/mangodb";

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
      return Response.json({ error: false, message: "success" });
    }

    return Response.json({
      error: true,
      message: "User does not exist",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({
      error: true,
      message: "Internal server error",
    });
  }
}
