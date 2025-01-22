import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/layout/Layout.tsx";
import { supabase } from "@/supabaseClient.ts";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";

interface Message {
  id: string;
  message: string;
  created_at: string;
  sender_id: string;
}

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: {
    from: string;
    text: string;
    timestamp: string;
  }[];
}

const Chats = () => {
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useSupabaseSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // Fetch User Details
  const fetchUserDetails = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("first_name, last_name, image")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return {
        name: `${data.first_name} ${data.last_name}`,
        avatar: data.image,
      };
    } catch (err) {
      console.error("Error fetching user details:", err);
      return {
        name: "Unknown User",
        avatar: "https://via.placeholder.com/150",
      };
    }
  };

  // Fetch Conversations
  const fetchConversations = async () => {
    if (!session?.user) return;

    setLoadingConversations(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          id,
          user1_id,
          user2_id,
          messages (
            id,
            message,
            created_at,
            sender_id
          )
        `,
        )
        .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch details for each other user in parallel
      // @ts-ignore
      const formattedConversations: Conversation[] = await Promise.all(
        // @ts-ignore
        data.map(async (conversation: any) => {
          const otherUserId =
            conversation.user1_id === session.user.id
              ? conversation.user2_id
              : conversation.user1_id;

          const { name, avatar } = await fetchUserDetails(otherUserId);

          return {
            id: conversation.id,
            name,
            avatar,
            lastMessage:
              conversation.messages[conversation.messages.length - 1]
                ?.message || "",
            time:
              new Date(
                conversation.messages[conversation.messages.length - 1]
                  ?.created_at,
              ).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              }) || "",
            unread: 0, // Add unread count logic
            messages: conversation.messages.map((msg: Message) => ({
              from: msg.sender_id === session.user.id ? "Du" : name,
              text: msg.message,
              timestamp: new Date(msg.created_at).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            })),
          };
        }),
      );

      setConversations(formattedConversations);

      // Automatically set the active chat if an `id` is provided in the query params
      const queryConversationId = searchParams.get("id");
      if (queryConversationId) {
        const targetConversation = formattedConversations.find(
          (conv) => conv.id === queryConversationId,
        );
        if (targetConversation) setActiveChat(targetConversation);
      } else if (formattedConversations.length > 0) {
        setActiveChat(formattedConversations[0]);
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Send a Message
  const sendMessage = async (messageText: string) => {
    if (!activeChat || !session?.user) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          conversation_id: activeChat.id,
          sender_id: session.user.id,
          message: messageText,
        },
      ]);

      if (error) throw error;

      setActiveChat((prevChat) =>
        prevChat
          ? {
              ...prevChat,
              messages: [
                ...prevChat.messages,
                {
                  from: "Du",
                  text: messageText,
                  timestamp: new Date().toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : null,
      );
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Real-Time Updates for Messages
  useEffect(() => {
    if (!activeChat) return;

    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeChat?.id}`,
        },
        (payload) => {
          const newMessage = payload.new;
          setActiveChat((prevChat) =>
            prevChat
              ? {
                  ...prevChat,
                  messages: [
                    ...prevChat.messages,
                    {
                      from:
                        newMessage.sender_id === session.user.id
                          ? "Du"
                          : activeChat.name,
                      text: newMessage.message,
                      timestamp: new Date(
                        newMessage.created_at,
                      ).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    },
                  ],
                }
              : null,
          );
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [activeChat, session?.user?.id]);

  useEffect(() => {
    if (session) fetchConversations();
  }, [session]);

  if (sessionLoading) return <div className="text-center mt-20">Laden...</div>;
  if (sessionError)
    return <div className="text-center mt-20">Fehler: {sessionError}</div>;

  return (
    <Layout>
      <div className="w-10/12 mx-auto mt-10 flex bg-white border-2 border-green-600 rounded-2xl shadow-lg h-[80vh]">
        {/* Chat List (Left Side) */}
        <div className="w-4/12 border-r-2 border-gray-200 h-full">
          <h2 className="text-2xl font-bold p-5 border-b-2 border-gray-200">
            Chats
          </h2>
          <div className="overflow-y-auto h-[calc(100%-72px)]">
            {loadingConversations ? (
              <p className="text-center mt-4">Laden...</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveChat(conversation)}
                  className={`flex items-center p-4 hover:bg-gray-100 transition cursor-pointer ${
                    activeChat?.id === conversation.id ? "bg-green-50" : ""
                  }`}
                >
                  {conversation.avatar ? (
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full border-2 border-green-600 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700 cursor-pointer">
                      {conversation.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-lg">
                      {conversation.name}
                    </h3>
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
              ))
            )}
          </div>
        </div>

        {/* Chat Window (Right Side) */}
        <div className="w-8/12 flex flex-col h-full">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  {activeChat.avatar ? (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700 cursor-pointer">
                      {activeChat.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}

                  <h3 className="ml-4 text-lg font-semibold">
                    {activeChat.name}
                  </h3>
                </div>
                <button className="text-green-600 font-semibold">
                  Optionen
                </button>
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
                        {activeChat.avatar ? (
                          <img
                            src={activeChat.avatar}
                            alt={message.from}
                            className="w-8 h-8 rounded-full border-2 border-green-600 object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center font-bold text-green-700 cursor-pointer">
                            {message.from
                              .split(" ")
                              .map((word) => word.charAt(0))
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}
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
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && messageInput.trim()) {
                        sendMessage(messageInput.trim());
                        setMessageInput("");
                      }
                    }}
                  />
                  <button
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                    onClick={() => {
                      if (messageInput.trim()) {
                        sendMessage(messageInput.trim());
                        setMessageInput("");
                      }
                    }}
                  >
                    Senden
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Wählen Sie einen Chat aus.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
