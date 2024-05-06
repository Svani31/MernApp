import { NextResponse } from "next/server"
import prisma from "/src/app/utils/prismaDb"
import { pusherServer } from "@/app/utils/pusher"



export async function POST(body){
    try{
        const {context,senderId,reciverId,chatId} = await body.json()
        console.log(reciverId)

        const createMessage = await prisma.message.create({
            data:{
                context:context,
                senderId:senderId,
                reciverId:reciverId,
                chatId:chatId
            }
        })
        pusherServer.trigger(chatId,"incoming-message",createMessage)
        console.log(createMessage)
        return NextResponse.json(createMessage)
    }catch(error){
        throw error
    }
}