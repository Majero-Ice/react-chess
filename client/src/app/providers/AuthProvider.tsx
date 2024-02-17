import { FC, PropsWithChildren, ReactNode, createContext,useState } from "react";



interface AuthProviderProps{
    children:ReactNode
}

interface IValue{
    userName:string 
    opponentName:string
    getOpponent: (newOpponent:string,cb:() =>any) => void
    getUser: (newUser:string,cb:() =>any) => void
}

export const AuthContext = createContext({} as IValue)

export const AuthProvider:FC<AuthProviderProps> = ({children}:PropsWithChildren<AuthProviderProps>) =>{

    const [userName,setUserName] = useState<string>('')
    const [opponentName,setOpponentName] = useState<string>('')

    

    const getUser = (newUser:string,cb:() =>any) =>{
        setUserName(newUser)
        console.log(newUser)
        cb()
    }
    const getOpponent = (newOpponent:string,cb:() =>any) =>{
        setOpponentName(newOpponent)
        cb()
    }

    const value:IValue = {userName,opponentName,getOpponent,getUser}


    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}