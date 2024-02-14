import { createContext } from "react";
import { io } from "socket.io-client";

const server = process.env.REACT_APP_SERVER ?? ''
export const socket = io(server)
export const SocketContext = createContext(socket)