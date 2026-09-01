import React, { useState } from 'react';
import { X, Send, Bot, User, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatModal: React.FC = () => {
  const { isLiveChatOpen, setIsLiveChatOpen } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Namaste! Welcome to Civora Support AI Assistant. How can I assist you with municipal services, bill payments, or grievances today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isLiveChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userQuery = input.toLowerCase();
    setInput('');

    // Simulate AI / Assistant Response
    setTimeout(() => {
      let replyText =
        'Thank you for reaching out. You can track your complaints or pay property taxes & water bills directly from your Civora dashboard.';

      if (userQuery.includes('water') || userQuery.includes('schedule') || userQuery.includes('flow')) {
        replyText =
          'Water supply in Greenwood Residential Sector is currently FLOWING at 3.2 BAR. Next scheduled supply is Friday 6:00 AM - 9:00 AM.';
      } else if (userQuery.includes('garbage') || userQuery.includes('waste') || userQuery.includes('truck')) {
        replyText =
          'Garbage Collection Truck #402 is currently 1.2km away in Sector 4 and arriving in approximately 12 minutes.';
      } else if (userQuery.includes('complaint') || userQuery.includes('pothole') || userQuery.includes('leak')) {
        replyText =
          'You can register a new grievance with photo & location from the "Register Complaint" page. Your reference ID will be generated instantly.';
      } else if (userQuery.includes('bill') || userQuery.includes('tax') || userQuery.includes('pay') || userQuery.includes('rupees') || userQuery.includes('₹')) {
        replyText =
          'Municipal bills can be settled in Indian Rupees (₹) using GPay, PhonePe, UPI, or Cards in the "Bill Payment" section.';
      } else if (userQuery.includes('emergency') || userQuery.includes('police') || userQuery.includes('fire') || userQuery.includes('ambulance')) {
        replyText =
          'For immediate emergencies: Police - 100/112, Fire - 101, Ambulance - 102/108. Emergency support details are also under the Help tab.';
      }

      const botReply: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-4 bg-[#003d9b] text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={20} className="text-[#6bff8f]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Civora AI & Support Assistant</h3>
              <p className="text-xs text-blue-200">24/7 Municipal Citizen Support</p>
            </div>
          </div>
          <button
            onClick={() => setIsLiveChatOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Hotline Bar */}
        <div className="bg-emerald-50 dark:bg-slate-800 px-4 py-2 border-b border-emerald-100 dark:border-slate-700 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <span className="flex items-center gap-1 font-medium">
            <PhoneCall size={12} /> Emergency Helpline: 1800-CIVORA-HELP
          </span>
          <span className="font-bold text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.5 rounded uppercase">
            Live
          </span>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#003d9b] text-white'
                    : 'bg-[#6bff8f] text-[#007432]'
                }`}
              >
                {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-[#003d9b] text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block text-right">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your civic question or report..."
            className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-[#003d9b]"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#003d9b] text-white rounded-xl hover:bg-[#0052cc] transition-colors active:scale-95"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
