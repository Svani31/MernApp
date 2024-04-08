"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession,getSession } from 'next-auth/react';


function UserChat({currentUser}:any) {
    const router = useRouter()
    const {data:session} = useSession()

    useEffect(()=>{
        if(!currentUser) router.push("/components/main") 
        
    },[currentUser, router])
    
    useEffect(()=>{
        if(currentUser){
        const fetchApi = async () =>{
            const getData = await fetch(`http://localhost:3000/api/chat/${currentUser}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({senderId:session?.id})
            })
            const data = await getData.json()
            console.log(data)
        }
        fetchApi()
       }
    },[currentUser])


    return (
        <div className='border-2 border-blue-600 rounded-2xl'>
            <h1 className=' text-center font-bold text-2xl text-blue-600'>Chat</h1>
        <div style={{height:"80vh",width:"100vh"}}>
            <div className=''>
            <div className='flex justify-start'>
                <h1 className='ml-10 bg-blue-500 p-2'>His Text</h1>
            </div>
            <div className='flex  justify-end'>
                <h1 className='p-2 bg-red-500 mr-10'>My Text</h1>
            </div>
            </div>
        </div>
            <div className='bg-transparent border-t-2 border-blue-700 rounded-xl p-4'><input className='outline-none border-none bg-transparent' type="text" placeholder='Write A Message'/></div>
        </div> 
    );
}

export default UserChat;
