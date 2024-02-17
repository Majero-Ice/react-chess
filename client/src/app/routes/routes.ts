import { ComponentType } from "react"
import {GamePage,StartPage,LoginPage} from "../../pages/"


export enum RouteNames {
    START = '/start-page',
    GAME = '/game',
    LOGIN = '/login'
}
interface IRoute {
    path:string,
    component:ComponentType
}




export const publicRoutes:IRoute[] = [
    {path:RouteNames.START,component:StartPage},
]

export const privateRoutes:IRoute[] = [
    {path:RouteNames.GAME + '/:id',component:GamePage},
    {path:RouteNames.LOGIN,component:LoginPage}
]