/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession,getSession } from 'next-auth/react';
import {pusherClient, pusherServer} from "@/app/utils/pusher"

function UserChat({currentUser}:any) {

    const [userMessage,setUserMessage] = useState<any>()
    const [contextInput,setContextInput] = useState<string>()
    const {data:session} = useSession()
    const router = useRouter()


    // console.log(session?.user.id)
    useEffect(()=>{
        if(!currentUser) router.push("/components/main") 
        
    },[currentUser, router])
    
    useEffect(()=>{
        if(currentUser){
        const fetchApi = async () =>{
            const getData = await fetch(`http://localhost:3000/api/chat`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({userId:session?.user.id})
            })
            const data = await getData.json()
            setUserMessage(data.message)
            console.log(data.message)
        }
        fetchApi()
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])


    const createMessageHandler = async(e:any) =>{
        e.preventDefault()
        const session = await getSession()
        const postMessage = await fetch("http://localhost:3000/api/message",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                context:contextInput,
                senderId:session?.user.id,
                reciverId:currentUser,
                chatId:userMessage[0].chatId
            })
        })
        console.log(postMessage)
    }
    useEffect(()=>{
        if(userMessage && userMessage.length > 0){
            let chatId = userMessage[0]?.chatId
            pusherClient.subscribe(chatId)
        pusherClient.bind("incoming-message",(userMessage:any)=>{
            console.log(userMessage)
            setUserMessage((prev:any)=> [...prev,userMessage])
        })
        return()=>{
            pusherClient.unsubscribe(chatId)
        }
    }

    },[])

    return (
        <div className='border-2 border-blue-600 rounded-2xl'>
            <h1 className=' text-center font-bold text-2xl text-blue-600'>Chat</h1>
        <div style={{height:"80vh",width:"100vh"}}>
            {userMessage?.map((eachUser:any)=>{
                return(
                    <div className='mt-3' key={eachUser.id}>
                        {eachUser.senderId === session?.user.id ? (<div className='flex justify-start mt-2'>
                <h1 className='ml-10 bg-blue-500 p-2 rounded-2xl'>{eachUser.context}</h1>
            </div>):(<div className='flex  justify-end mt-2'>
                <h1 className='p-2 bg-red-500 mr-10 rounded-2xl'>{eachUser.context}</h1>
            </div>)}
                    </div>
                )
            })}
        </div>
        <form onSubmit={(e)=> createMessageHandler(e)} action="submit">
            <div className='bg-transparent border-t-2 border-blue-700 rounded-xl p-4'><input onChange={(e)=> setContextInput(e.target.value)} className='outline-none border-none w-full bg-transparent' type="text" placeholder='Write A Message'/></div>
        </form>
        </div> 
    );
}

export default UserChat;