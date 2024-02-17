import { FC, PropsWithChildren } from "react";


interface WithAuthProps{
    children:JSX.Element
}

const WithAuth:FC<WithAuthProps> = ({children}:PropsWithChildren<WithAuthProps>) => {

    return children
};

export default WithAuth;