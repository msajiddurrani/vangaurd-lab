import '../index.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import VanguardAIChat from '../components/VanguardAIChat';

export const metadata = {
  title: 'Vanguard Athletic Lab | Elite Training Protocols & Macro Diagnostics',
  description: 'Elite training protocols, biomechanical kinesiology encyclopedia, and macro diagnostics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <ProtectedRoute>
              <div id="app-root" className="min-h-screen bg-gray-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-gold-500 selection:text-black transition-colors duration-300">
                <Header />
                {children}

                <footer id="global-footer" className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-900 py-10 mt-auto transition-colors duration-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span className="font-display text-base font-black tracking-widest uppercase text-black dark:text-white transition-colors duration-300">
                        VANGUARD<span className="text-gold-500 dark:text-gold-400">&amp;</span>LAB
                      </span>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">
                        &copy; {new Date().getFullYear()} VANGUARD ATHLETIC LAB. ELITE PROGRAMMING.
                      </p>
                    </div>
                  </div>
                </footer>
                
                {/* Global Vanguard AI Coach Floating Widget */}
                <VanguardAIChat />
              </div>
            </ProtectedRoute>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
