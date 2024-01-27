import { Socket, io } from "socket.io-client";

const PORT = process.env.SOCKET_IO_PORT!;

export default function socketClient() {
  const socket = io(`${PORT}`, { path: "api/socket", addTrailingSlash: false });

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });

  socket.on("connect_error", async (err) => {
    console.log("connect_error due to " + err.message);
    await fetch("api/socket");
  });
}
