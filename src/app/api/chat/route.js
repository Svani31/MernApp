import prisma from "@/app/utils/prismaDb";
import { create } from "domain";
import { NextResponse } from "next/server";

// export async function POST(body){
//     try{
//         const {context,senderId,reciverId} = await body.json()
//         console.log(body)
//         const createMessage = await prisma.chat.create({
//             data:{
//                 context:context,
//                 senderId:senderId,
//                 reciverId:reciverId
//             }
//         })
//         console.log(createMessage,"this is user")
//         return NextResponse.json(createMessage)
//     }catch(error){
//         throw(error)
//     }
// }

// export async function GET(req,body){
//     try{
//         // const {senderId} = await body.json()
//         const request = req.json()
//         console.log(request)
//         const {searchParams} = new URL(req.url)
//         const reciverId = searchParams.get("id")
//     }catch(error){
//         throw error
//     }
// }

// export async function GET(){
//     try{
//         const getChat = await prisma.chat.findMany({
//             include:{
//                 sentMessage:true,
//                 reciveMessage:true
//             }
//         })
//         return NextResponse.json(getChat)
//     }catch(error){
//         throw error
//     }
// }

export async function POST(body) {
  try {
    const { userId } = await body.json();
    console.log(userId);

    const findChat = await prisma.chat.findFirst({
        where:{
            userId
        },
        include:{
            message:true
        }
    });
    console.log(findChat)

    if (findChat) {
        console.log("FGHfg")
      return NextResponse.json(findChat);
    } 

      const createChat = await prisma.chat.create({
        data: {
          userId,
        },
      });
      console.log("FGHfg")
      return NextResponse.json(createChat);
    
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  try {
    const getChat = await prisma.chat.findMany({
      include: {
        message: true,
      },
    });
    console.log(getChat);
    return NextResponse.json(getChat);
  } catch (error) {
    throw error;
  }
}
