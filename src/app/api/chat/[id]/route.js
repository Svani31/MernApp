import prisma from "../../../utils/prismaDb"
import {NextResponse} from "next/server"

// export async function POST(body,req){
//     try{
//         const reciverId = await req.params.id
//         const {senderId} = await body.json() 
//         console.log(senderId)
//         const findSenderChat = await prisma.chat.findMany({
//             where:{
//                 senderId:senderId,
//                 reciverId:reciverId
//             }
//         })
//         const findReciverChat = await prisma.chat.findMany({
//             where:{
//                 senderId:reciverId,
//                 reciverId:senderId
//             }
//         })

//         const chat = {
//             senderChat:findSenderChat,
//             reciverChat:findReciverChat,
//         }
//         console.log(chat,"this is chat")
//         return NextResponse.json(chat)
//     }catch(error){
//         throw error
//     }
// }


// export async function POST(body){
//     try{
//         const secondUserId = await req.params.id
//         console.log(secondUserId)
//         const {firstUserId} = await body.json()
//         const findChat = await prisma.chat.findUnique({
//             where:{
//                 userId:userId
//             }
//         })
//         console.log(findChat)
//         return NextResponse.json(findChat)
//     }catch(error){
//         throw error
//     }
// }