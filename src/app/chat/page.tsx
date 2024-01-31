"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = io("http://localhost:5000");
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState<String[]>([]);

  useEffect(() => {
    socket.on("chat message", (msg: String) => {
      setAllMessage([...allMessage, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
  };

  return (
    <div className=" h-screen p-4">
      <div className=" fixed right-10 bottom-32">
        {allMessage.map((mes, index) => {
          return (
            <div className="flex justify-end p-4 m-4 bg-indigo-300 rounded-full">
              <span key={mes + `${index}`}>{mes}</span>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-4 left-0 right-0 p-4">
        <div className="flex ">
          <input
            className=" border-slate-400 bg-slate-200 border-2 rounded-xl w-full px-3 py-1 active:border-blue-300 "
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-xl px-3 py-1 ml-3 hover:bg-blue-600 "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
