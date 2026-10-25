import React from 'react';
import AthleteWorkspace from '../../../components/AthleteWorkspace';
import AIDiagnosticsTerminal from '../../../components/AIDiagnosticsTerminal';
import { Activity } from 'lucide-react';

export default function CalculatorsPage() {
  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-zinc-900 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 text-gold-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>AI Diagnostic Hub</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            AI <span className="text-gold-500 italic">DIAGNOSTICS</span>
          </h1>
          <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider mt-3 max-w-2xl mx-auto sm:mx-0">
            Provide your metrics or upload a photo of your nutrition to instantly generate an elite macro protocol.
          </p>
        </div>

        <div className="mb-16">
          <AIDiagnosticsTerminal />
        </div>

        {/* Existing Macro Architect & Splits */}
        <div className="mt-16">
          <AthleteWorkspace />
        </div>

      </div>
    </div>
  );
}
