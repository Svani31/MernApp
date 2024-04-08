import prisma from "../../../utils/prismaDb"
import {NextResponse} from "next/server"

export async function POST(body,req){
    try{
        const {senderId} = await body.json() 
        console.log(senderId)
        const reciverId = await req.params.id
        const findSenderChat = await prisma.chat.findMany({
            where:{
                senderId:senderId,
                reciverId:reciverId
            }
        })
        const findReciverChat = await prisma.chat.findMany({
            where:{
                senderId:reciverId,
                reciverId:senderId
            }
        })

        const chat = {
            senderChat:findSenderChat,
            reciverChat:findReciverChat,
        }
        console.log(chat,"this is chat")
        return NextResponse.json(chat)
    }catch(error){
        throw error
    }
}

