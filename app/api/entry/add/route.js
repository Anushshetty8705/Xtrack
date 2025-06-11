import clientPromise from "@/lib/mangodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, date, time, description, amount } = body;

    if (!username || !description || isNaN(amount)) {
      return Response.json({ success: false, message: "Invalid data" });
    }

    const client = await clientPromise;
    const db = client.db("Xtrack");
    const collection = db.collection("entries");

    await collection.insertOne({
      username,
      date,
      time,
      description,
      amount,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error adding entry:", err);
    return Response.json({ success: false, message: "Server error" });
  }
}
