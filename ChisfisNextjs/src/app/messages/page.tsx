"use client";

import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
//import Cookies from "js-cookie"; //@ezra - remove js-cookie
import { ChatLayout } from "@/components/chat/chat-layout";
import { getChatLayout } from "@/utils/helpers";

export interface MessagesProps {}

const Messages: FC<MessagesProps> = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const [defaultLayout, setDefaultLayout] = useState<any>();

  useEffect(() => {
    //const layout = Cookies.get("react-resizable-panels:layout");
    const layout = getChatLayout();
    setDefaultLayout(layout ? JSON.parse(layout) : undefined);
  }, []);

  return (
    <div className="nc-Blank">
      <div className="container h-screen">
        <div className="flex h-full w-full max-w-3xl flex-col mx-auto">
          <div className="flex-grow overflow-auto">
            {/* <ChatMessageList /> */}
          </div>
          <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
      </div>
    </div>
  );
};

export default Messages;