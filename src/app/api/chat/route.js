import prisma from "@/app/utils/prismaDb"
import { NextResponse } from 'next/server'


export async function POST(body){
    try{
        const {context,senderId,reciverId} = await body.json()
        console.log(body)
        const createMessage = await prisma.chat.create({
            data:{
                context:context,
                senderId:senderId,
                reciverId:reciverId
            }
        })
        console.log(createMessage,"this is user")
        return NextResponse.json(createMessage)
    }catch(error){
        throw(error)
    }
}

export async function GET(req,body){
    try{
        // const {senderId} = await body.json()
        const request = req.json()
        console.log(request)
        const {searchParams} = new URL(req.url)
        const reciverId = searchParams.get("id")
    }catch(error){
        throw error
    }
}