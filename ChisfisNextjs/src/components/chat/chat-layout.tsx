"use client";
import { User} from "@/app/userChatData";
import React, { useCallback, useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../sidebar";
import { Chat } from "./chat";
import { useSession } from "next-auth/react";
import axios from "axios";
import moment from 'moment';
import useChatStore from "@/hooks/useChatStore";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const params = {userId : user.userId}
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({name:'', messages:'', avatar:''});

  const [isLoading, setIsLoading] = useState(true);

  
  const fetchChatData = useCallback( async () => {
    let url1, url2, r1, r2;
  
    try {

          url1 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/messagesSidebar/get`, params)
          .then(function(response){
          
            r1 = response.data[0];
          });
          
          url2 =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/messages/get`, params)
          .then(function(response){
            
            r2 = response.data[0];
          });

          const obj = [];
                obj[0] = r1;
                obj[1] = r2;

                return await obj;

        } catch (error) {
          console.error(error);
          //setIsLoading(false);
          //setError(error.message);
        }
  }, [params] );

  const loadChatData = useCallback( async () => {
    const data = await fetchChatData();

    let r1, r2, r3;

    if(data){
      r1 = data[0];
      r2 = data[1];
    
      r1.map((str) => {
        str.messages = []; 
      });

      r2.map((str) => {
        str.timestamp = moment(new Date(str.timestamp)).fromNow();   
      });

      r3 = r1;
    
      r3.forEach(item => {
        item.messages = [];
        var x= r2.filter(t => t.fromId == item.id ||  t.userId == item.id );
        item.messages = x;
      });

      setSelectedUser(r3[0]);
      setUserData(r3);

      useChatStore.setState((state) => ({
        messages: r3[0].messages
      }));

      useChatStore.setState((state) => ({
        selectedUser: r3[0]
      }));

      useChatStore.setState((state) => ({ //UserData
        users: r3
      }));

      setIsLoading(false);
    }
  }, [fetchChatData,]);

  useEffect(() => {
    if (user) {
      loadChatData();
    }
  }, [user, loadChatData]);

  useEffect(() => {

      const checkScreenWidth = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      // Initial check
      checkScreenWidth();

      // Event listener for screen width changes
      window.addEventListener("resize", checkScreenWidth);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", checkScreenWidth);
      };
  }, []);

  return (

    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`
      }}
      className="h-full items-stretch"
    >
      <><ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={isMobile ? 0 : 24}
          maxSize={isMobile ? 8 : 30}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          } }
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          } }
          className={cn(
            isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
          )}
        >

       {!isLoading && (
            <Sidebar
              isCollapsed={isCollapsed || isMobile}
              chats={userData.map((user) => ({
                name: user.name,
                messages: user.messages ?? [],
                avatar: user.avatar,
                variant: selectedUser.name === user.name ? "secondary" : "ghost",
              }))}
              isMobile={isMobile} />
       )}
      
        </ResizablePanel><ResizableHandle withHandle /><ResizablePanel className="data-panel" defaultSize={defaultLayout[1]} minSize={30}>
          {!isLoading && (
                <Chat
                messages={selectedUser.messages}
                isMobile={isMobile} />
          )}

        </ResizablePanel></>
    </ResizablePanelGroup>
  );
}