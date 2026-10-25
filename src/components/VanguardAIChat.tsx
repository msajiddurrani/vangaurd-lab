"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, Loader2, Pause, Play, Square } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function VanguardAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "I am Vanguard AI, your elite athletic coach and macro architect. How can I optimize your protocols today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice feature states
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition (Speech to Text)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Please use Google Chrome.");
      return;
    }
    
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech') {
        console.warn("Speech recognition issue:", event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text to Speech
  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); 
    setIsPaused(false);
    
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const togglePause = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPaused) {
      window.speechSynthesis.resume();
    } else if (isSpeaking) {
      window.speechSynthesis.pause();
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);
    stopSpeaking(); // Stop any ongoing speech when user sends a new message

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      
      if (res.ok && data.text) {
        setMessages(prev => [...prev, { role: 'model', content: data.text }]);
        speak(data.text);
      } else {
        const errorMsg = data.error || "Communication failure.";
        setMessages(prev => [...prev, { role: 'model', content: `Error: ${errorMsg}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Network error connecting to Vanguard AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(212,163,89,0.4)] border border-gold-300/50 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="text-black w-7 h-7 fill-black" />
        {isSpeaking && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[650px] max-h-[85vh] flex flex-col bg-white dark:bg-zinc-950 border border-gray-200/80 dark:border-zinc-800/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden font-sans backdrop-blur-xl"
          >
            {/* Premium Header */}
            <div className="relative flex items-center justify-between px-6 py-5 bg-zinc-950 border-b border-zinc-800 shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent pointer-events-none" />
              <div className="relative flex items-center space-x-4">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                  <span className="font-display font-black text-black text-sm">VAI</span>
                  {isSpeaking && !isPaused && (
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-black text-white uppercase tracking-widest text-sm drop-shadow-sm">Vanguard AI</h3>
                  <div className="flex items-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2 shadow-[0_0_5px_rgba(212,163,89,0.8)]" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      {isSpeaking ? (isPaused ? 'Voice Paused' : 'Speaking...') : 'System Ready'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-center space-x-1">
                {isSpeaking && (
                  <>
                    <button 
                      onClick={togglePause}
                      className="p-2 text-zinc-400 hover:text-gold-500 hover:bg-gold-500/10 rounded-lg transition-colors"
                      title={isPaused ? "Resume Speaking" : "Pause Speaking"}
                    >
                      {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                    </button>
                    <button 
                      onClick={stopSpeaking}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Stop Speaking"
                    >
                      <Square className="w-4 h-4 fill-current" />
                    </button>
                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                  </>
                )}
                
                <button 
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled);
                    if (voiceEnabled) stopSpeaking();
                  }}
                  className={`p-2 rounded-lg transition-colors ${voiceEnabled ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                  title={voiceEnabled ? "Mute AI Voice" : "Enable AI Voice"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50 dark:bg-[#050505]/95">
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-md bg-gold-500/20 flex items-center justify-center mr-3 mt-1 shrink-0 border border-gold-500/30">
                      <span className="text-[8px] font-black text-gold-600 dark:text-gold-400">VAI</span>
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-black font-medium rounded-tr-sm shadow-gold-500/20' 
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-800 rounded-tl-sm'
                    }`}
                  >
                    {msg.content.split('\n').map((line, i) => (
                      <span key={i} className="block min-h-[1em]">
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="w-6 h-6 rounded-md bg-gold-500/20 flex items-center justify-center mr-3 mt-1 shrink-0 border border-gold-500/30">
                    <span className="text-[8px] font-black text-gold-600 dark:text-gold-400">VAI</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center space-x-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-gold-500 animate-spin" />
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest font-medium">Analyzing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Premium Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t border-gray-200/80 dark:border-zinc-800 shrink-0">
              <div className={`relative flex items-end bg-gray-100 dark:bg-zinc-900 rounded-2xl border transition-all duration-300 shadow-inner ${
                isListening ? 'border-red-500/50 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-zinc-800 focus-within:border-gold-500/50 focus-within:ring-4 focus-within:ring-gold-500/10'
              }`}>
                
                <button
                  onClick={startListening}
                  className={`p-3 m-1 shrink-0 rounded-xl transition-all duration-300 ${
                    isListening 
                      ? 'text-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                      : 'text-zinc-500 hover:text-gold-600 hover:bg-gold-500/10'
                  }`}
                  title={isListening ? "Listening... Click to stop" : "Voice Input"}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening to your protocol..." : "Ask Vanguard AI..."}
                  className="flex-1 max-h-32 min-h-[52px] bg-transparent border-none focus:ring-0 text-sm py-4 px-2 resize-none text-zinc-900 dark:text-white placeholder-zinc-500 font-medium"
                  rows={1}
                  disabled={isLoading}
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-3 m-1 shrink-0 bg-zinc-900 dark:bg-zinc-800 text-gold-500 rounded-xl hover:bg-gold-500 hover:text-black disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-gold-500 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
