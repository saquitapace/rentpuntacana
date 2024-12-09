export const Users: User[] = [
  {
    id: "M29SZDR4QDJBB6",
    avatar:
      "/images/avatars/Image-1.png",
    messages: [],
    name: "Toni S",
  },
  {
    id: "12345678",
    avatar:
      "/images/avatars/Image-3.png",
    messages: [],
    name: "Natalie F",
  },
  {
    id: "M29S4QCR4567",
    avatar:
      "/images/avatars/Image-10.png",
    messages: [],
    name: "Anthony F",
  },
  {
    id: "X12S4QCR5211AQ",
    avatar:
      "/images/avatars/Image-6.png",
    messages: [],
    name: "Lisa G",
  },
  {
    id: "M29S4QCR52115P",
    avatar:
      "/images/avatars/Image-9.png",
    messages: [],
    name: "Sarah C",
  },
];

export const userData: User[] = [
  {
    id: "M29SZDR4QDJBB6",  //userId
    avatar: "/images/avatars/Image-1.png",
    messages: [
      {
        id: 1, 
        avatar:
          "/images/avatars/Image-1.png",
        name: "Toni S", // userId M29S4QCR52115P
        message: "Hey, Sarah", // fromId M29S4QCR52115P 
        timestamp: "10:00 AM", // timestamp & moment js
      },
      {
        id: 2,
        avatar:
          "/images/avatars/Image-9.png",
        name: "Sarah",
        message: "Hey!",
        timestamp: "10:01 AM",
      },
      {
        id: 3,
        avatar:
          "/images/avatars/Image-1.png",
        name: "Toni S",
        message: "How are you?",
        timestamp: "10:02 AM",
      },
      {
        id: 4,
        avatar:
          "/images/avatars/Image-9.png",
        name: "Sarah C",
        message: "I am good, you?",
        timestamp: "10:03 AM",
      },
      {
        id: 5,
        avatar:
          "/images/avatars/Image-1.png",
        name: "Toni S",
        message: "I am good too!",
        timestamp: "10:04 AM",
      },
      {
        id: 6,
        avatar:
          "/images/avatars/Image-9.png",
        name: "Sarah C",
        message: "That is good to hear!",
        timestamp: "10:05 AM",
        isLiked: true,
      },
      {
        id: 7,
        avatar:
          "/images/avatars/Image-1.png",
        name: "Toni S",
        message: "How has your day been so far?",
        timestamp: "10:06 AM",
      },
      {
        id: 8,
        avatar:
          "/images/avatars/Image-9.png",
        name: "Sarah C",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
        timestamp: "10:10 AM",
      },
      {
        id: 9,
        avatar:
          "/images/avatars/Image-1.png",
        name: "Toni S",
        isLoading: true,
      },
    ],
    name: "Toni S",
  },
  {
    id: "12345678",
    avatar:
      "/images/avatars/Image-3.png",
    name: "Natalie F",
    messages: [],
  },
  {
    id: "M29S4QCR4567",
    avatar:
    "/images/avatars/Image-10.png",
    name: "Anthony F",
    messages: [],
  },
  {
    id: "X12S4QCR5211AQ",
    avatar:
      "/images/avatars/Image-6.png",
    name: "Lisa G",
    messages: [],
  },
];

export const ChatBotMessages: Message[] = [
  {
    id: 1,
    avatar: "/",
    name: "ChatBot",
    message: "Hello! How can I help you today?",
    timestamp: "10:00 AM",
    role: "ai",
  },
  {
    id: 2,
    avatar:
      "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "I need help with my order",
    timestamp: "10:01 AM",
    role: "user",
  },
  {
    id: 3,
    avatar: "/",
    name: "ChatBot",
    message: "Sure! Please provide me with your order number",
    timestamp: "10:02 AM",
    role: "ai",
  },
  {
    id: 4,
    avatar:
      "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "123456",
    timestamp: "10:03 AM",
    role: "user",
  },
  {
    id: 5,
    avatar: "/",
    name: "ChatBot",
    message: "Thank you! One moment please while I look up your order",
    timestamp: "10:04 AM",
    role: "ai",
  },
  {
    id: 6,
    avatar: "/",
    name: "ChatBot",
    message:
      "I have found your order. It is currently being processed and will be shipped out soon.",
    timestamp: "10:05 AM",
    role: "ai",
  },
  {
    id: 7,
    avatar:
      "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "Thank you for your help!",
    timestamp: "10:06 AM",
    role: "user",
  },
  {
    id: 8,
    avatar: "/",
    name: "ChatBot",
    message: "You are welcome! Have a great day!",
    isLoading: true,
    timestamp: "10:10 AM",
    role: "ai",
  },
];

export type UserData = (typeof userData)[number];

// export const loggedInUserData = {
//   id: "M29S4QCR52115P",
//   avatar:
//     "/images/avatars/Image-9.png",
//   name: "Sarah C",
// };

// export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message?: string;
  isLoading?: boolean;
  timestamp?: string;
  role?: string;
  isLiked?: boolean;
}

export interface User {
  id: string;
  avatar: string;
  messages: Message[];
  name: string;
}
