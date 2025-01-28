import { toast } from "react-toastify";
import { supabase } from "@/supabaseClient.ts";

export const supportUserId = "bcd120c4-8718-4991-9816-5e860dda927c";

export const handleContactSupport = async (session: any, navigate: any) => {
  if (!session || !session.user) {
    toast.error("You need to log in to contact support.");
    return;
  }

  const userId = session.user.id;
  const targetUserId = supportUserId;

  try {
    // Check if a conversation between the user and support already exists
    const { data: existingConversations, error: conversationError } =
      await supabase
        .from("conversations")
        .select("*")
        .or(
          `and(user1_id.eq.${userId},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${userId})`,
        )
        .limit(1);

    if (conversationError) throw conversationError;

    let conversationId;

    if (existingConversations && existingConversations.length > 0) {
      // Conversation already exists
      conversationId = existingConversations[0].id;
    } else {
      // Create a new conversation between the user and support
      const { data: newConversation, error: newConversationError } =
        await supabase
          .from("conversations")
          .insert([
            {
              user1_id: userId,
              user2_id: targetUserId,
            },
          ])
          .select()
          .single();

      if (newConversationError) throw newConversationError;

      conversationId = newConversation.id;
    }

    // Navigate to the chat with the obtained conversation ID
    navigate(`/chats?id=${conversationId}`);
  } catch (err) {
    console.error("Error contacting support:", err);
    toast.error("An error occurred while trying to contact support.");
  }
};
