import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Creator {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  specialties: string[];
  rating: number;
  total_chats: number;
  response_time: string;
  is_online: boolean;
  verified: boolean;
}

interface Conversation {
  id: string;
  creator_id: string;
  creator_name: string;
  creator_avatar: string;
  title: string;
  last_message: string;
  last_message_at: string;
  is_archived: boolean;
  unread_count: number;
}

interface Message {
  id: string;
  sender_type: 'user' | 'creator';
  content: string;
  created_at: string;
  is_read: boolean;
  media_url?: string;
  media_type?: string;
}

export function useChatData(userId?: string) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCreators();
    if (userId) {
      fetchConversations();
    }
  }, [userId]);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_creators')
        .select('*')
        .order('is_online', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      setCreators(data || []);
    } catch (err) {
      console.error('Error fetching creators:', err);
      setError('Failed to load creators');
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    if (!userId) return;

    try {
      const { data: convData, error: convError } = await supabase
        .from('chat_conversations')
        .select(`
          id,
          creator_id,
          title,
          last_message_at,
          is_archived,
          chat_creators (
            name,
            avatar_url
          )
        `)
        .eq('user_id', userId)
        .order('last_message_at', { ascending: false });

      if (convError) throw convError;

      const conversationsWithMessages = await Promise.all(
        (convData || []).map(async (conv: any) => {
          const { data: lastMsg } = await supabase
            .from('chat_conversation_messages')
            .select('content, is_read')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          const { count: unreadCount } = await supabase
            .from('chat_conversation_messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .eq('sender_type', 'creator');

          return {
            id: conv.id,
            creator_id: conv.creator_id,
            creator_name: conv.chat_creators?.name || 'Unknown',
            creator_avatar: conv.chat_creators?.avatar_url || '',
            title: conv.title,
            last_message: lastMsg?.content || 'No messages yet',
            last_message_at: conv.last_message_at,
            is_archived: conv.is_archived,
            unread_count: unreadCount || 0,
          };
        })
      );

      setConversations(conversationsWithMessages);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_conversation_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const createConversation = async (creatorId: string) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: userId,
          creator_id: creatorId,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchConversations();
      return data;
    } catch (err) {
      console.error('Error creating conversation:', err);
      return null;
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('chat_conversation_messages')
        .insert({
          conversation_id: conversationId,
          sender_type: 'user',
          sender_id: userId,
          content,
        });

      if (error) throw error;

      await supabase
        .from('chat_conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      await fetchMessages(conversationId);
      await fetchConversations();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return {
    creators,
    conversations,
    messages,
    loading,
    error,
    fetchMessages,
    createConversation,
    sendMessage,
    refreshConversations: fetchConversations,
  };
}
