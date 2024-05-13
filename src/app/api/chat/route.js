import prisma from "@/app/utils/prismaDb";
import { NextResponse } from "next/server";



export async function POST(body,req) {
  try {
    const { firstUserId,secondUserId } = await body.json();
    console.log(firstUserId,secondUserId);

    const findChat = await prisma.chat.findFirst({
        where:{
          firstUserId:firstUserId,
          secondUserId:secondUserId
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
          firstUserId,
          secondUserId
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
