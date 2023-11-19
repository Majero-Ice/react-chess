import { Navigate} from "react-router-dom";
import {RouteNames} from "./routes";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "../../shared/lib/hooks/useAuth";


interface WithAuthProps{
    children:JSX.Element
}

const WithAuth:FC<WithAuthProps> = ({children}:PropsWithChildren<WithAuthProps>) => {

    const {userName} = useAuth()

    
    // if(!user){
    //     return <Navigate to={RouteNames.START} replace/>
    // }



    return children
};

export default WithAuth;