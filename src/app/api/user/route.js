import prisma from "@/app/utils/prismaDb"
import { NextResponse } from 'next/server'

export async function POST(req){
    try{
        const {email,name,password,image} = await req.json()
        console.log({email,name,password})
        const createUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:password,
                image:image
            }
        })
        console.log(createUser,"this is user")
        return NextResponse.json(createUser)
    }catch(error){
        throw(error)
    }
}


export async function GET(){
    try{
        const getAllUser = await prisma.user.findMany({
            include:{
                sentMessage:true,
                reciveMessage:true,
            },
        })
        console.log(getAllUser,"this is user")
        return NextResponse.json(getAllUser)
    }catch(error){
        throw error
    } 
}