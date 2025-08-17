import { useState, useEffect } from 'react';

interface Chat {
  id: string;
  eventTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participants: number;
  eventImage: string;
  type: 'group' | 'direct';
}

const mockChats: Chat[] = [
  {
    id: '1',
    eventTitle: 'Morning Yoga in the Park',
    lastMessage: 'Thanks everyone! See you tomorrow morning 🧘‍♀️',
    lastMessageTime: '2m',
    unreadCount: 3,
    participants: 15,
    eventImage: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'group'
  },
  {
    id: '2',
    eventTitle: 'Tech Startup Networking',
    lastMessage: 'Great meeting you all! Looking forward to our collaboration',
    lastMessageTime: '1h',
    unreadCount: 0,
    participants: 42,
    eventImage: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'group'
  },
  {
    id: '3',
    eventTitle: 'Weekend Hiking Adventure',
    lastMessage: 'Don\'t forget to bring plenty of water and snacks!',
    lastMessageTime: '3h',
    unreadCount: 7,
    participants: 8,
    eventImage: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'group'
  }
];

export function useChats() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [loading, setLoading] = useState(false);

  const refreshChats = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return {
    chats,
    loading,
    refreshChats
  };
}