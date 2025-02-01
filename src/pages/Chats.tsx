import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/layout/Layout.tsx";
import { supabase } from "@/supabaseClient.ts";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";
import { supportUserId } from "../../helpers.ts";

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
  // Управление отображением списка чатов на мобильных устройствах:
  const [showChatList, setShowChatList] = useState<boolean>(true);

  const isValidDate = (date: Date): boolean => {
    return !isNaN(date.getTime());
  };

  const isValidTime = (timeStr: string): boolean => {
    return timeStr !== "Invalid Date" && timeStr.trim() !== "";
  };

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

      // @ts-ignore
      const formattedConversations: Conversation[] = await Promise.all(
        data.map(async (conversation: any) => {
          const otherUserId =
            conversation.user1_id === session.user.id
              ? conversation.user2_id
              : conversation.user1_id;

          const { name, avatar } = await fetchUserDetails(otherUserId);

          const lastMessageObj =
            conversation.messages && conversation.messages.length > 0
              ? conversation.messages[conversation.messages.length - 1]
              : null;

          let formattedTime = "";
          if (lastMessageObj && lastMessageObj.created_at) {
            const date = new Date(lastMessageObj.created_at);
            if (isValidDate(date)) {
              formattedTime = date.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              });
            }
          }

          return {
            id: conversation.id,
            name,
            avatar,
            lastMessage: lastMessageObj ? lastMessageObj.message : "",
            time: formattedTime,
            unread: 0,
            messages: conversation.messages.map((msg: Message) => ({
              from: msg.sender_id === session.user.id ? "Du" : name,
              text: msg.message,
              timestamp: (() => {
                const msgDate = new Date(msg.created_at);
                return isValidDate(msgDate)
                  ? msgDate.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";
              })(),
            })),
          };
        }),
      );

      setConversations(formattedConversations);

      const queryConversationId = searchParams.get("id");
      if (queryConversationId) {
        const targetConversation = formattedConversations.find(
          (conv) => conv.id === queryConversationId,
        );
        if (targetConversation) {
          setActiveChat(targetConversation);
          setShowChatList(false);
        }
      } else if (formattedConversations.length > 0) {
        setActiveChat(formattedConversations[0]);
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoadingConversations(false);
    }
  };

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

      const currentTime = new Date();
      const formattedTime = isValidDate(currentTime)
        ? currentTime.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      setActiveChat((prevChat) =>
        prevChat
          ? {
              ...prevChat,
              lastMessage: messageText,
              time: formattedTime,
              messages: [
                ...prevChat.messages,
                {
                  from: "Du",
                  text: messageText,
                  timestamp: formattedTime,
                },
              ],
            }
          : null,
      );
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  useEffect(() => {
    if (!activeChat) return;

    const channel = supabase
      .channel(`realtime-messages-${activeChat.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeChat.id}`,
        },
        (payload) => {
          const newMessage = payload.new;
          const messageDate = new Date(newMessage.created_at);

          setActiveChat((prevChat) =>
            prevChat
              ? {
                  ...prevChat,
                  lastMessage: newMessage.message,
                  time: isValidDate(messageDate)
                    ? messageDate.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : prevChat.time,
                  messages: [
                    ...prevChat.messages,
                    {
                      from:
                        newMessage.sender_id === session.user.id
                          ? "Du"
                          : prevChat.name,
                      text: newMessage.message,
                      timestamp: isValidDate(messageDate)
                        ? messageDate.toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "",
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
    if (session) {
      ensureSupportChatExists().then(() => {
        fetchConversations();
      });
    }
  }, [session]);

  const ensureSupportChatExists = async () => {
    if (!session?.user || session.user.id === supportUserId) return;

    try {
      const userId = session.user.id;

      const filter = `and(user1_id.eq.${userId},user2_id.eq.${supportUserId}),and(user1_id.eq.${supportUserId},user2_id.eq.${userId})`;

      const { data: existingConversations, error: fetchError } = await supabase
        .from("conversations")
        .select("id")
        .or(filter);

      if (fetchError) throw fetchError;

      if (existingConversations && existingConversations.length > 0) {
        const existingChat = existingConversations[0];
        const targetConversation = conversations.find(
          (conv) => conv.id === existingChat.id,
        );
        if (targetConversation && !activeChat)
          setActiveChat(targetConversation);
      } else {
        const { data: newConversation, error: createError } = await supabase
          .from("conversations")
          .insert([
            {
              user1_id: userId,
              user2_id: supportUserId,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;

        const { name, avatar } = await fetchUserDetails(supportUserId);

        const formattedConversation: Conversation = {
          id: newConversation.id,
          user1_id: userId,
          user2_id: supportUserId,
          name,
          avatar,
          lastMessage: "",
          time: "",
          unread: 0,
          messages: [],
        };
        setActiveChat(formattedConversation);
      }
    } catch (err) {
      console.error("Error ensuring support chat exists:", err);
    }
  };

  if (sessionLoading) return <div className="text-center mt-20">Laden...</div>;
  if (sessionError)
    return <div className="text-center mt-20">Fehler: {sessionError}</div>;

  return (
    <Layout>
      <div className="lg:w-10/12 w-11/12 mx-auto mt-10 flex bg-white border-2 lg:border-green-600 rounded-2xl lg:shadow-lg h-[80vh]">
        <div
          className={`lg:block ${
            showChatList ? "block" : "hidden"
          } w-full lg:w-4/12 border-r-2 border-gray-200 h-full`}
        >
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
                  onClick={() => {
                    setActiveChat(conversation);
                    setShowChatList(false);
                  }}
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
                    <div className="w-12 h-12 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700">
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
                      {truncateText(conversation.lastMessage, 30)}
                    </p>
                  </div>
                  <div className="text-right">
                    {isValidTime(conversation.time) && (
                      <p className="text-xs text-gray-500">
                        {conversation.time}
                      </p>
                    )}
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

        <div
          className={`lg:w-8/12 w-full flex ${
            showChatList ? "hidden" : ""
          } flex-col h-full`}
        >
          {activeChat ? (
            <>
              <div className="p-4 border-b-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    className="lg:hidden mr-4 text-green-600 focus:outline-none"
                    onClick={() => setShowChatList(true)}
                  >
                    &#8592;
                  </button>
                  {activeChat.avatar ? (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-10 h-10 rounded-full border-2 border-green-600 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700">
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
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {activeChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${
                      message.from === "Du" ? "justify-end" : ""
                    }`}
                  >
                    {message.from !== "Du" && (
                      <div className="mr-2">
                        {activeChat.avatar ? (
                          <img
                            src={activeChat.avatar}
                            alt={message.from}
                            className="w-8 h-8 rounded-full border-2 border-green-600 object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center font-bold text-green-700">
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
                      {isValidTime(message.timestamp) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
