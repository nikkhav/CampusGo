import { useState } from "react";
import Layout from "@/layout/Layout.tsx";

const conversations = [
  {
    id: "1",
    name: "Nikita K.",
    lastMessage: "Bis später um 12:00!",
    time: "10:15 Uhr",
    unread: 2,
    avatar: "https://i.pravatar.cc/150?img=7",
    messages: [
      {
        from: "Nikita K.",
        text: "Hi! Bist du bereit für die Fahrt?",
        timestamp: "10:00 Uhr",
      },
      {
        from: "Du",
        text: "Ja, bis später um 12:00!",
        timestamp: "10:05 Uhr",
      },
    ],
  },
  {
    id: "2",
    name: "Sophia B.",
    lastMessage: "Ich freue mich darauf!",
    time: "9:00 Uhr",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=2",
    messages: [
      { from: "Sophia B.", text: "Kommst du mit?", timestamp: "Gestern" },
      { from: "Du", text: "Ja, bis später!", timestamp: "Gestern" },
    ],
  },
  {
    id: "3",
    name: "Mark T.",
    lastMessage: "Alles klar, bis bald!",
    time: "8:30 Uhr",
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=3",
    messages: [
      {
        from: "Mark T.",
        text: "Wann bist du da?",
        timestamp: "8:20 Uhr",
      },
      {
        from: "Du",
        text: "In 10 Minuten!",
        timestamp: "8:25 Uhr",
      },
    ],
  },
];

const Chats = () => {
  const [activeChat, setActiveChat] = useState(conversations[0]);

  return (
    <Layout>
      <div className="w-10/12 mx-auto mt-10 flex bg-white border-2 border-green-600 rounded-2xl shadow-lg h-[80vh]">
        {/* Chat List (Left Side) */}
        <div className="w-4/12 border-r-2 border-gray-200 h-full">
          <h2 className="text-2xl font-bold p-5 border-b-2 border-gray-200">
            Chats
          </h2>
          <div className="overflow-y-auto h-[calc(100%-72px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveChat(conversation)}
                className={`flex items-center p-4 hover:bg-gray-100 transition cursor-pointer ${
                  activeChat.id === conversation.id ? "bg-green-50" : ""
                }`}
              >
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full border-2 border-green-600 object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg">{conversation.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{conversation.time}</p>
                  {conversation.unread > 0 && (
                    <span className="bg-green-600 text-white text-xs rounded-full px-2 py-1">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window (Right Side) */}
        <div className="w-8/12 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b-2 border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
              />
              <h3 className="ml-4 text-lg font-semibold">{activeChat.name}</h3>
            </div>
            <button className="text-green-600 font-semibold">Optionen</button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {activeChat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  message.from === "Du" ? "justify-end" : ""
                }`}
              >
                {message.from !== "Du" && (
                  <div>
                    <img
                      src={activeChat.avatar}
                      alt={message.from}
                      className="w-8 h-8 rounded-full border-2 border-green-600 object-cover"
                    />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg shadow-sm ${
                    message.from === "Du"
                      ? "bg-green-600 text-white"
                      : "bg-white border border-gray-200"
                  } max-w-xs`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t-2 border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Schreibe eine Nachricht..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                Senden
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
