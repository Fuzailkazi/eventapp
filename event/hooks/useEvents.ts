import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  image: string;
  host: {
    name: string;
    avatar: string;
    rating: number;
  };
  rating: number;
  isFavorite: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Yoga in the Park',
    description: 'Start your day with peaceful yoga session in beautiful Golden Gate Park. All levels welcome!',
    location: 'Golden Gate Park, San Francisco',
    date: '2024-01-20',
    time: '08:00',
    attendees: 15,
    maxAttendees: 25,
    category: 'Health',
    image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=800',
    host: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9
    },
    rating: 4.8,
    isFavorite: false,
    tags: ['yoga', 'wellness', 'morning']
  },
  {
    id: '2',
    title: 'Tech Startup Networking',
    description: 'Connect with fellow entrepreneurs and investors. Great opportunity to share ideas and find potential collaborators.',
    location: 'WeWork, SOMA District',
    date: '2024-01-22',
    time: '18:30',
    attendees: 42,
    maxAttendees: 50,
    category: 'Business',
    image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
    host: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7
    },
    rating: 4.6,
    isFavorite: true,
    tags: ['networking', 'startup', 'business']
  },
  {
    id: '3',
    title: 'Weekend Hiking Adventure',
    description: 'Explore the beautiful trails of Marin Headlands with breathtaking views of the Bay Area.',
    location: 'Marin Headlands Trail',
    date: '2024-01-25',
    time: '09:00',
    attendees: 8,
    maxAttendees: 12,
    category: 'Sports',
    image: 'https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&w=800',
    host: {
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8
    },
    rating: 4.9,
    isFavorite: false,
    tags: ['hiking', 'outdoor', 'nature']
  }
];

const mockCategories: Category[] = [
  { id: '1', name: 'Technology', icon: '💻', count: 24 },
  { id: '2', name: 'Sports', icon: '⚽', count: 18 },
  { id: '3', name: 'Arts', icon: '🎨', count: 12 },
  { id: '4', name: 'Music', icon: '🎵', count: 15 },
  { id: '5', name: 'Food', icon: '🍕', count: 21 },
  { id: '6', name: 'Health', icon: '🧘', count: 16 }
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(false);
  const [categories] = useState<Category[]>(mockCategories);

  const popularEvents = events.filter(event => event.rating >= 4.7);

  const refreshEvents = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isFavorite: !event.isFavorite }
          : event
      )
    );
  };

  const createEvent = async (eventData: any) => {
    // Simulate API call
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      attendees: 0,
      maxAttendees: parseInt(eventData.maxAttendees) || 50,
      host: {
        name: 'Current User',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8
      },
      rating: 0,
      isFavorite: false,
      image: eventData.image || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    
    setEvents(prev => [newEvent, ...prev]);
  };

  const joinEvent = async (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  const leaveEvent = async (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, attendees: Math.max(0, event.attendees - 1) }
          : event
      )
    );
  };
  return {
    events,
    loading,
    categories,
    popularEvents,
    refreshEvents,
    toggleFavorite,
    createEvent,
    joinEvent,
    leaveEvent
  };
}