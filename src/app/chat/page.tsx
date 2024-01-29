"use client";
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";

let msg = ["hello", "hi", "buy", "hood", "gogojfisjfiwjef"];

export default function Chat() {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState<String[]>([]);

  return (
    <div className=" h-screen p-4">
      <div className=" fixed right-10 bottom-32">
        <div className="flex justify-end p-4 m-4 bg-indigo-300 rounded-full">
          <span>{msg[1]}</span>
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 p-4">
        <InputField />
      </div>
    </div>
  );
}
