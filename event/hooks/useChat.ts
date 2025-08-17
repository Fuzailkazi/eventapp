import { useState, useEffect } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  isCurrentUser: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Hey everyone! Looking forward to this event 🎉',
    timestamp: '10:30 AM',
    user: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    isCurrentUser: false
  },
  {
    id: '2',
    text: 'Same here! Should we meet at the main entrance?',
    timestamp: '10:32 AM',
    user: {
      id: '1',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    isCurrentUser: true
  },
  {
    id: '3',
    text: 'Perfect! I\'ll be wearing a blue jacket so you can spot me easily',
    timestamp: '10:35 AM',
    user: {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    isCurrentUser: false
  }
];

export function useChat(eventId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [participants] = useState(15);

  const sendMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      user: {
        id: '1',
        name: 'You',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      isCurrentUser: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return {
    messages,
    participants,
    sendMessage
  };
}