"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Send, Mic, Loader2, Image as ImageIcon, X } from 'lucide-react';

interface DiagnosticResult {
  content: string;
}

export default function AIDiagnosticsTerminal() {
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
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
      setInput(prev => prev + " " + transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech') {
        console.warn("Speech recognition issue:", event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image is too large. Max 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!input.trim() && !imageFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let base64Image = null;
      let mimeType = null;

      if (imageFile) {
        base64Image = await fileToBase64(imageFile);
        mimeType = imageFile.type;
      }

      const res = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: input,
          imageBase64: base64Image,
          mimeType: mimeType
        })
      });

      const data = await res.json();
      
      if (res.ok && data.text) {
        setResult({ content: data.text });
      } else {
        setError(data.error || "Failed to analyze diagnostics.");
      }
    } catch (error) {
      setError("Network error connecting to Vanguard AI Diagnostics.");
    } finally {
      setIsLoading(false);
    }
  };

  // Very basic markdown renderer for the response
  const renderMarkdown = (text: string) => {
    const sections = text.split('\n');
    return sections.map((line, idx) => {
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-xl font-display font-black text-white mt-6 mb-2 uppercase">{line.replace('## ', '').replace(/\*/g, '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-2xl font-display font-black text-gold-500 mt-6 mb-3 uppercase">{line.replace('# ', '').replace(/\*/g, '')}</h2>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={idx} className="ml-4 text-zinc-300 mb-1 font-sans text-sm"><span className="text-gold-500 mr-2">•</span>{line.substring(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
      }
      if (line.includes('|') && line.includes('---')) return null; // Very basic table separator ignore
      if (line.includes('|')) {
        // Very basic table row styling
        const cols = line.split('|').filter(c => c.trim() !== '');
        return (
          <div key={idx} className="flex border-b border-zinc-800/50 py-2">
            {cols.map((col, i) => (
              <div key={i} className={`flex-1 px-4 text-sm ${i === 0 ? 'text-zinc-400 font-medium' : 'text-white font-bold'}`}>
                {col.trim().replace(/\*\*(.*?)\*\*/g, '$1')}
              </div>
            ))}
          </div>
        );
      }
      if (line.trim() === '') return <br key={idx} />;
      return <p key={idx} className="text-zinc-300 font-sans text-sm leading-relaxed mb-2">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Container */}
      <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
        
        {/* Terminal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-4 text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-medium">Vanguard_AI_Terminal_v3.6</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-2">Input Parameters</h2>
            <p className="text-zinc-400 text-sm">Provide your current metrics, goals, or upload a photo of your food/pantry for AI synthesis.</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g. I am 25 years old, weigh 82kg, height 180cm. I want to build lean muscle."
              className="w-full min-h-[120px] bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none text-sm leading-relaxed"
            />

            {/* Attachments & Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-zinc-900/30 p-2 rounded-2xl border border-zinc-800/50">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={startListening}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-500/20 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    {isListening ? 'Listening...' : 'Voice Input'}
                  </span>
                </button>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider font-bold hidden sm:inline">Visual Input</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading || (!input.trim() && !imageFile)}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(212,163,89,0.3)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <span>Initialize</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Image Preview */}
            <AnimatePresence>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative inline-block mt-4"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-700 max-w-sm">
                    <img src={imagePreview} alt="Upload preview" className="w-full h-auto object-cover" />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center space-x-2 text-gold-500">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">Visual Matrix Loaded</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl mt-4">
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-zinc-800/80 bg-[#020202] p-6 md:p-8"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,163,89,0.4)]">
                  <span className="text-black font-black font-display text-xs">VAI</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-white uppercase tracking-wider text-sm">Diagnostics Complete</h3>
                  <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Protocol Generated</p>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {renderMarkdown(result.content)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
