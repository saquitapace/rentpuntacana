"use client";

import React, { FC, useEffect, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import avatar4 from "@/images/avatars/Image-4.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import Cookies from "js-cookie";
import { ChatLayout } from "@/components/chat/chat-layout";

export interface BlankProps {}

const Blank: FC<BlankProps> = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const [defaultLayout, setDefaultLayout] = useState<any>();

  useEffect(() => {
    const layout = Cookies.get("react-resizable-panels:layout");
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

export default Blank;