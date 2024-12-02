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
    router.push('/login');
    return null;
  }

  const [defaultLayout, setDefaultLayout] = useState<any>();

  useEffect(() => {
    const layout = Cookies.get("react-resizable-panels:layout");
    setDefaultLayout(layout ? JSON.parse(layout) : undefined);
  }, []);

  return (
    <div className={`nc-Blank`}>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADER */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Blank Template
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              text
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <ChatMessageList />
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blank;