'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const SUPPORT_ONLINE = true;

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button className="chat-launch" onClick={() => setOpen(true)}>
        <MessageCircle size={18} />
        Message
      </button>
      {open && (
        <div className="chat-window">
          <div className="chat-top">
            <div className="chat-identity">
              <span className="chat-avatar">
                <MessageCircle size={16} />
                {SUPPORT_ONLINE && <span className="chat-presence" aria-hidden="true" />}
              </span>
              <div>
                <strong>Support</strong>
                <span className={`chat-status${SUPPORT_ONLINE ? ' is-online' : ''}`}>
                  {SUPPORT_ONLINE ? 'Online now' : 'Away'}
                </span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages">
            {!messages.length && (
              <div className="chat-greeting">
                <p>
                  {SUPPORT_ONLINE
                    ? "You're connected. Someone from support is online and will reply here shortly."
                    : "We're away right now. Leave a message and we'll get back to you."}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className="chat-bubble">
                <p>{msg}</p>
                <small>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-compose">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}