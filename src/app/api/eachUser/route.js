import prisma from "@/app/utils/prismaDb"
import { NextResponse } from 'next/server'


export async function POST(body){
    try{
        const {myId} = await body.json()
        const getAllUser = await prisma.user.findMany({
            where:{
                id:{
                    not:myId
                },
            },
            include:{
                firstUserChat:true,
                secondUserChat:true,
            }
        })
        console.log(getAllUser,"this is user")
        return NextResponse.json(getAllUser)
    }catch(error){
        throw error
    } 
}