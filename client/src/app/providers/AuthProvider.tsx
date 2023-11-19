import { FC, PropsWithChildren, ReactNode, createContext, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";



interface AuthProviderProps{
    children:ReactNode
}

interface IValue{
    userName:string 
    opponentName:string
    socket:Socket
    getOpponent: (newOpponent:string,cb:() =>any) => void
    getUser: (newUser:string,cb:() =>any) => void
}

export const AuthContext = createContext({} as IValue)

export const AuthProvider:FC<AuthProviderProps> = ({children}:PropsWithChildren<AuthProviderProps>) =>{

    const [userName,setUserName] = useState<string>('')
    const [opponentName,setOpponentName] = useState<string>('')
    const socket = useRef(io('http://localhost:5000'))

    

    const getUser = (newUser:string,cb:() =>any) =>{
        setUserName(newUser)
        console.log(newUser)
        cb()
    }
    const getOpponent = (newOpponent:string,cb:() =>any) =>{
        setOpponentName(newOpponent)
        cb()
    }

    const value:IValue = {userName,opponentName,socket:socket.current,getOpponent,getUser}


    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}