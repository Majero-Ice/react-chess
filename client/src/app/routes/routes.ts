import { ComponentType } from "react"
import Game from "../../pages/Game/Game"
import Start from "../../pages/Start/Start"
import Login from "../../pages/Login/Login"





export enum RouteNames {
    START = '/start-page',
    GAME = '/game',
    LOGIN = '/login'
}
export interface IRoute {
    path:string,
    component:ComponentType
}




export const publicRoutes:IRoute[] = [
    {path:RouteNames.START,component:Start},
]

export const privateRoutes:IRoute[] = [
    {path:RouteNames.GAME + '/:id',component:Game},
    {path:RouteNames.LOGIN,component:Login}
]