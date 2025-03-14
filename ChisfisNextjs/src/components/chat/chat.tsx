import { Message, User} from "@/app/userChatData";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, {useState} from "react";
import useChatStore from "@/hooks/useChatStore";

interface ChatProps {
  messages?: Message[];
  selectedUser?: User[];
  isMobile: boolean;
}

export function Chat({ messages, isMobile }: ChatProps) {

  const messagesState = useChatStore((state) => state.messages);
  const selectedUser = useChatStore((state) => state.selectedUser);
  
  const sendMessage = (newMessage: Message) => {
     useChatStore.setState((state) => ({
        messages: [...state.messages, newMessage],
     }));
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
