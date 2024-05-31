/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserChat from "./[id]/page";

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

function  MainPage() {
  const [getUser, setGetUser] = useState<UserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<string>();

  
  // const { data: session } = useSession();
  const route = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      const getUser = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/eachUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({myId:session?.user.id})
      });
      const jsonUser = await getUser.json();
      setGetUser(jsonUser);
    };
    fetchData();
  }, [currentUser]);

  const logoutHandler = () => {
    signOut();
    route.push("/");
  };

  const currentUserHandler = async (e:any) =>{
    setCurrentUser(e)
    const session = await getSession()
    const id = e
    const chatHandler = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}api/chat`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firstUserId:session?.user.id,
        secondUserId:id
      })
    })
    const chat = await chatHandler.json()
    console.log(chat)
    const newUrl = `/components/main/${id}`
    window.history.pushState({path:`/main${e}`},"",newUrl)
  }
  
  // setCurrentUser(getUser[1])

  useEffect(()=>{
    const fetchSession = async()=>{
      const session = await getSession()
      console.log(session)
      if(!session?.user) route.push("/")
    }
    fetchSession()
  },[])


  
  return (
    <div className="flex w-full">
      <div className="mt-6 ml-6">
        <h1>Messenger</h1>
        <div className="max-w-52 mt-6">
          {getUser.map((eachUser) => {
            return (
                <div
                  onClick={(e) => currentUserHandler(eachUser.id)}
                  key={eachUser.id}
                  className={
                    currentUser == eachUser.id
                      ? "bg-gray-400 cursor-pointer border-blue-500 rounded-xl border-l-2 border-r-2 border-t-2 flex p-2 gap-3"
                      : "cursor-pointer border-blue-500 rounded-xl border-l-2 border-r-2 border-t-2 flex p-2 gap-3"
                  }
                >
                  {/* <Image
                    className="w-12 h-12 rounded-2xl"
                    src={`${eachUser.image}`}
                    alt="User Image"
                    width={"48"}
                    height={"48"}
                  /> */}
                  <div>
                    <h1>{eachUser.name}</h1>
                    <h1>Last Message</h1>
                  </div>
                </div>
            );
          })}
          <h1 onClick={() => logoutHandler()}>Sign Out</h1>
        </div>
      </div>
      <div className="flex justify-center mt-5 w-full">
        <UserChat currentUser={currentUser}/>
      </div>
    </div>
  );
}

export default MainPage;
