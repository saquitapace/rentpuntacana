export const Users: User[] = [
  {
    id: "M29SZDR4QDJBB6",
    avatar: "/images/avatars/Image-1.png",
    messages: [],
    name: "Toni S",
    fromId: "M29S4QCR52115P",
    userId: "M29SZDR4QDJBB6"
  }
];



// export const Users: User[] = [
//   {
//     id: "M29SZDR4QDJBB6",
//     avatar: "/images/avatars/Image-1.png",
//     messages: [],
//     name: "Toni S",
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "12345678",
//     avatar: "/images/avatars/Image-3.png",
//     messages: [],
//     name: "Natalie F",
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "M29S4QCR4567",
//     avatar: "/images/avatars/Image-10.png",
//     messages: [],
//     name: "Anthony F",
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "X12S4QCR5211AQ",
//     avatar: "/images/avatars/Image-6.png",
//     messages: [],
//     name: "Lisa G",
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "M29S4QCR52115P",
//     avatar: "/images/avatars/Image-9.png",
//     messages: [],
//     name: "Sarah C",
//     fromId: "",
//     userId: ""
//   },
// ];



// export const userData: User[] = [
//   {
//     id: "M29SZDR4QDJBB6", //TONI
//     avatar: "/images/avatars/Image-1.png",
//     messages: [
//       {
//         id: 1,
//         avatar: "/images/avatars/Image-1.png",
//         name: "Toni S", // userId M29S4QCR52115P
//         message: "Hey, Sarah", // fromId M29S4QCR52115P 
//         timestamp: "10:00 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 2,
//         avatar: "/images/avatars/Image-9.png",
//         name: "Sarah",
//         message: "Hey!",
//         timestamp: "10:01 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 3,
//         avatar: "/images/avatars/Image-1.png",
//         name: "Toni S",
//         message: "How are you?",
//         timestamp: "10:02 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 4,
//         avatar: "/images/avatars/Image-9.png",
//         name: "Sarah C",
//         message: "I am good, you?",
//         timestamp: "10:03 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 5,
//         avatar: "/images/avatars/Image-1.png",
//         name: "Toni S",
//         message: "I am good too!",
//         timestamp: "10:04 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 6,
//         avatar: "/images/avatars/Image-9.png",
//         name: "Sarah C",
//         message: "That is good to hear!",
//         timestamp: "10:05 AM",
//         isLiked: true,
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 7,
//         avatar: "/images/avatars/Image-1.png",
//         name: "Toni S",
//         message: "How has your day been so far?",
//         timestamp: "10:06 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 8,
//         avatar: "/images/avatars/Image-9.png",
//         name: "Sarah C",
//         message: "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
//         timestamp: "10:10 AM",
//         fromId: "",
//         userId: ""
//       },
//       {
//         id: 9,
//         avatar: "/images/avatars/Image-1.png",
//         name: "Toni S",
//         isLoading: true,
//         fromId: "",
//         userId: ""
//       },
//     ],
//     name: "Toni S",
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "12345678",
//     avatar: "/images/avatars/Image-3.png",
//     name: "Natalie F",
//     messages: [],
//     fromId: "",
//     userId: ""
//   },
//   {
//     id: "M29S4QCR4567",
//     avatar: "/images/avatars/Image-10.png",
//     name: "Anthony F",
//     messages: [],
//     fromId: "",
//     userId: ""
//   }
// ];

export const userData: User[] = [
  {
    id: "M29SZDR4QDJBB6", //TONI
    avatar: "/images/avatars/Image-1.png",
    messages: [
      {
        id: 1,
        avatar: "/images/avatars/Image-1.png",
        name: "Toni S", // userId M29S4QCR52115P
        message: "Hey, Shakira", // fromId M29S4QCR52115P 
        timestamp: "10:00 AM",
        fromId: "M29S4QCR52115P",
        userId: "M29SZDR4QDJBB6"
      },
      {
        id: 8,
        avatar: "/images/avatars/Image-9.png",
        name: "Sarah C",
        message: "Shakira Shakira",
        timestamp: "10:10 AM",
        fromId: "M29S4QCR52115P",
        userId: "M29SZDR4QDJBB6"
      },
    ],
    name: "Toni S",
    fromId: "",
    userId: ""
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
    fromId: "",
    userId: ""
  },
  {
    id: 2,
    avatar: "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "I need help with my order",
    timestamp: "10:01 AM",
    role: "user",
    fromId: "",
    userId: ""
  },
  {
    id: 3,
    avatar: "/",
    name: "ChatBot",
    message: "Sure! Please provide me with your order number",
    timestamp: "10:02 AM",
    role: "ai",
    fromId: "",
    userId: ""
  },
  {
    id: 4,
    avatar: "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "123456",
    timestamp: "10:03 AM",
    role: "user",
    fromId: "",
    userId: ""
  },
  {
    id: 5,
    avatar: "/",
    name: "ChatBot",
    message: "Thank you! One moment please while I look up your order",
    timestamp: "10:04 AM",
    role: "ai",
    fromId: "",
    userId: ""
  },
  {
    id: 6,
    avatar: "/",
    name: "ChatBot",
    message: "I have found your order. It is currently being processed and will be shipped out soon.",
    timestamp: "10:05 AM",
    role: "ai",
    fromId: "",
    userId: ""
  },
  {
    id: 7,
    avatar: "/images/avatars/Image-9.png",
    name: "Sarah C",
    message: "Thank you for your help!",
    timestamp: "10:06 AM",
    role: "user",
    fromId: "",
    userId: ""
  },
  {
    id: 8,
    avatar: "/",
    name: "ChatBot",
    message: "You are welcome! Have a great day!",
    isLoading: true,
    timestamp: "10:10 AM",
    role: "ai",
    fromId: "",
    userId: ""
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
  fromId: string;
  userId: string;
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
  fromId: string;
  userId: string;
}
