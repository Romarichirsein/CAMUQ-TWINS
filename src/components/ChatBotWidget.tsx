import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles } from "lucide-react";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis C&T Empire AI, votre conseiller virtuel bilingue. Comment puis-je vous aider aujourd'hui ? Saisie de mémoire, impression grand format, formations d'IA ou de marketing ?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    
    // Add user message to state
    const updatedMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });
      const data = await response.json();
      
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant" as const, content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant" as const, content: "Désolé, je rencontre des difficultés techniques à traiter votre demande. Veuillez réessayer." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant" as const, content: "Une erreur réseau est survenue. Veuillez vérifier votre connexion et m'écrire à nouveau." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-blue-900 hover:bg-blue-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-800 flex items-center justify-center relative cursor-pointer group"
          title="Discuter avec l'IA C&T"
        >
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse bg-blue-950 rounded-full p-1" />
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        </button>
      )}

      {/* Floating Chat Container Widget */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-150 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-4 flex items-center justify-between border-b border-blue-950">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950/70 text-yellow-400 flex items-center justify-center border border-blue-800 relative">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-blue-900"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm tracking-tight">C&T Empire AI</h4>
                <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Assistant Bilingue</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dialogue Space */}
          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-200"
          >
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div 
                  key={idx} 
                  className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
                      isAssistant 
                        ? "bg-white text-gray-700 rounded-tl-none border-gray-100" 
                        : "bg-blue-900 text-white rounded-tr-none border-blue-950"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-yellow-400 text-blue-950 flex items-center justify-center shrink-0 font-extrabold text-[10px]">
                      U
                    </div>
                  )}
                </div>
              );
            })}

            {/* Simulated Loading block */}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input field */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-150 flex gap-2 items-center"
          >
            <input 
              type="text"
              placeholder="Posez-moi votre question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-150 rounded-xl focus:ring-1 focus:ring-blue-900 focus:bg-white outline-none transition-all text-gray-700"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white disabled:bg-slate-200 disabled:text-gray-400 transition-colors cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
