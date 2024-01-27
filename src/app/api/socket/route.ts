
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest, NextResponse } from "next/server";
import type { Server as IoServer } from "socket.io";
import { Server } from "socket.io";

const PORT = process.env.SOCKET_IO_PORT!

export const config = { 
    api: {
        bodyparser: false
    }
}

interface SocketServer extends HTTPServer {
    io?: IoServer | undefined
}

interface SocketWithIo extends NetSocket {
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIo
}

export default function SocketHandler ( _req : NextApiRequest , res: NextApiResponseWithSocket) {
    if(res.socket.server.io) {
        res.status(200).json({success: true, message: "Socket is already running", socket: `${PORT}` })
        return;
    }

    console.log("Starting Socket.Io server on port:" + PORT)

    const io = new Server({path:"/api/socket", addTrailingSlash: false, cors: {origin: "*"}}).listen(parseInt(PORT))

    io.on("connect", socket => {
        const _socket = socket;

        console.log("socket connect", socket.id)

        _socket.broadcast.emit("Welcome", `Welcome ${_socket.id}`)

        socket.on("disconnect", async ()=> {
            console.log("socket disconnect")
        })
    })

    res.socket.server.io = io

    res.status(201).json({ success: true, message: "Socket is started", socket: `${PORT}`})
}