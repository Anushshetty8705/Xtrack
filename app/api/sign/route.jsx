import clientPromise from "@/lib/mongodb"
 
export async function POST(request) {
    const body= await request.json()
  
    const cilent= await clientPromise;
    const db =cilent.db("Xtrack")
    const collection =db.collection("users")
    const user =await collection.findOne({username:body.username})
     const male =await collection.findOne({email:body.email})
     const no =await collection.findOne({phone:body.phone})
if(user){
      return Response.json({error:"true" ,message:"username exits"})
}

 if(male){
      return Response.json({error:"true" ,message:"email exists"})
}
 if(no){
      return Response.json({error:"true" ,message:"phone number  exists"})
}
   const result=await collection.insertOne(
    {
        username:body.username,
        password:body.password,
        email:body.email,
        phone:body.phone
    }
   )
  return Response.json({error:"false" ,message:"sucess"})
}
