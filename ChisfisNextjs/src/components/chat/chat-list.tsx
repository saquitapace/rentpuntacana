import { Message} from "@/app/userChatData"; //UserData
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
//import { DotsVerticalIcon, HeartIcon, Share1Icon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";

interface ChatListProps {
  messages: Message[];
  selectedUser: {};
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

const getMessageVariant = (messageName: string, selectedUserName: string) =>
  messageName !== selectedUserName ? "sent" : "received";

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  console.log("messages")
  console.log(messages);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const actionIcons = [
    //{ icon: DotsVerticalIcon, type: "More" },
    //{ icon: Forward, type: "Like" },
   // { icon: Heart, type: "Share" },
  ];

  return (
    <div className="w-full overflow-y-auto h-full flex flex-col">
      <ChatMessageList ref={messagesContainerRef}>
        <AnimatePresence>
          {messages.map((message, index) => {
            const variant = getMessageVariant(message.name, selectedUser.name);
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: index * 0.05 + 0.2,
                  },
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="flex flex-col gap-2 p-4"
              >
                {/* Usage of ChatBubble component */}
                <ChatBubble variant={variant}>
                  <ChatBubbleAvatar src={message.avatar} />
                  <ChatBubbleMessage 
                  className="chatlist"
                  isLoading={message.isLoading}>
                    {message.message}
                    {message.timestamp && (
                      <ChatBubbleTimestamp timestamp={message.timestamp} />
                    )}
                  </ChatBubbleMessage>
                  <ChatBubbleActionWrapper>
                    {actionIcons.map(({ icon: Icon, type }) => (
                      <ChatBubbleAction
                        className="size-7"
                        key={type}
                        icon={<Icon className="size-4" />}
                        onClick={() =>
                          alert(
                            "saquita = Action " + type + " clicked for message " + index,
                          )
                        }
                      />
                    ))}
                  </ChatBubbleActionWrapper>
                </ChatBubble>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </ChatMessageList>
      <ChatBottombar messages={messages} selectedUser={selectedUser} isMobile={isMobile} />
    </div>
  );
}
