import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ChatContextValue {
  chatOpen: boolean;
  suggestions: string[];
  openChat: (suggestions?: string[]) => void;
  closeChat: () => void;
  clearSuggestions: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function openChat(newSuggestions?: string[]) {
    setChatOpen(true);
    if (newSuggestions?.length) setSuggestions(newSuggestions);
  }

  return (
    <ChatContext.Provider value={{
      chatOpen,
      suggestions,
      openChat,
      closeChat: () => setChatOpen(false),
      clearSuggestions: () => setSuggestions([]),
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
