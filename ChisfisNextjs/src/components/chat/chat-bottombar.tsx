import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "@/app/userChatData";
import { EmojiPicker } from "../emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChatInput } from "../ui/chat/chat-input";
import useChatStore from "@/hooks/useChatStore";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ChatBottombarProps {
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ isMobile }: ChatBottombarProps) {

  const { data: session } = useSession();
  const userSessionInfo = session?.user;
  const [user, setUser] = useState(userSessionInfo);

  const selectedUser = useChatStore((state) => state.selectedUser);
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
    
  const setMessages = useChatStore((state) => state.setMessages);

  const hasInitialResponse = useChatStore((state) => state.hasInitialResponse); //saquita chat

  const setHasInitialResponse = useChatStore(
    (state) => state.setHasInitialResponse,   //saquita chat
  );
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage]
    }));
    postMessagetToDB(newMessage);

  };

  const postMessagetToDB = async (newMessage: Message) => {
    console.log(newMessage);

    try {
      const response =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/messages/create`, newMessage);

      if (response) {
        console.log(response)       
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  }

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: user.firstName,
      avatar: user.avatar,
      message: "👍",
      fromId: user.userId,
      userId : selectedUser.id
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: user.firstName,
        avatar: user.avatar,
        message: message.trim(),
        fromId: user.userId,
        userId : selectedUser.id
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!hasInitialResponse) {
      setisLoading(true);
      setTimeout(() => {
        setMessages((messages) => [
          ...messages.slice(0, messages.length - 1),
          // {
          //   id: messages.length + 1,
          //   avatar:
          //     "/images/avatars/Image-1.png",
          //   name: "Toni S",
          //   message: "Awesome! I am just chilling outside.",
          //   timestamp: formattedTime,
          // },
        ]);
        setisLoading(false);
        setHasInitialResponse(true);
      }, 2500);
    }
  }, [hasInitialResponse, setHasInitialResponse, setMessages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
      <div className="flex hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Link
              href="#"
              className={ cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "shrink-0",
              )}
            >
              <PlusCircle size={22} className="text-muted-foreground hidden" />
            </Link>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-2">
            {message.trim() || isMobile ? (
              <div className="flex gap-2">
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "shrink-0",
                  )}
                >
                  <Mic size={22} className="text-muted-foreground" />
                </Link>
                {BottombarIcons.map((icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "shrink-0",
                    )}
                  >
                    <icon.icon size={22} className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "shrink-0",
                )}
              >
                <Mic size={22} className="text-muted-foreground" />
              </Link>
            )}
          </PopoverContent>
        </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex hidden">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "shrink-0",
                )}
              >
                <icon.icon size={22} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <ChatInput
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="rounded-full"
          />
          <div className="absolute right-4 bottom-2  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleSend}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <SendHorizontal size={22} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleThumbsUp}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <ThumbsUp size={22} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
