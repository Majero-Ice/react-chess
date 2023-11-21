import { createContext } from "react";
import { io } from "socket.io-client";
import { Server } from "../config";

export const socket = io(Server.SERVER_URL)
export const SocketContext = createContext(socket)