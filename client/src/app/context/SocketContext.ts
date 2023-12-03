import { createContext } from "react";
import { io } from "socket.io-client";
import { Server } from "../config";

export const socket = io(Server.LOCAL_SERVER)
export const SocketContext = createContext(socket)