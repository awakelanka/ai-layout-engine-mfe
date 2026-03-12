import { useEffect } from 'react';
import { useLayoutStore, type LayoutContext } from './store';
import { Layout, Eye, Cpu, AlignLeft } from 'lucide-react';

export default function App() {
  const { context, heatmapDensity, sidebarVisible, navPosition, cardGrid, setContext, simulateHeatmap } = useLayoutStore();

  // Listen to integration API events from the parent application securely
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Reject unauthorized origins in production
      if (!event.data || event.data.type !== 'UPDATE_CONTEXT') return;
      
      if (['FOCUS', 'DISCOVERY', 'DASHBOARD'].includes(event.data.payload)) {
        setContext(event.data.payload as LayoutContext);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setContext]);

  return (
    <div className={`h-screen w-screen flex transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${navPosition === 'TOP' ? 'flex-col' : navPosition === 'BOTTOM' ? 'flex-col-reverse' : 'flex-row'}
    `}>
      {/* Dynamic Navigation/Header */}
      <nav className={`
        bg-foreground text-background shadow-md flex items-center p-4 transition-all duration-700
        ${navPosition === 'SIDE' ? 'w-64 h-full flex-col' : 'w-full h-16 flex-row justify-between'}
      `}>
        <div className="flex items-center gap-2 font-bold mb-0">
          <Cpu className="animate-pulse" />
          {navPosition === 'SIDE' && <span>AI Layout</span>}
        </div>
        
        <div className={`flex gap-4 ${navPosition === 'SIDE' ? 'flex-col mt-8 w-full' : 'flex-row'}`}>
          <div className="h-4 w-24 bg-white/20 rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-white/20 rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-white/20 rounded-md animate-pulse"></div>
        </div>
      </nav>

      {/* Main Orchestrator */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Dynamic Sidebar (Enabled for DASHBOARD context) */}
        {sidebarVisible && (
          <aside className="w-56 bg-slate-100 border-r border-slate-200 p-4 transition-all duration-500">
             <div className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-2">
                 <AlignLeft size={16}/> MODULES
             </div>
             {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 w-full bg-slate-200 rounded-md mb-2"></div>
             ))}
          </aside>
        )}

        {/* Dynamic Content Grid */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
             <div>
               <h1 className="text-2xl font-bold flex items-center gap-2">
                 <Layout className="text-blue-500" />
                 Contextual Engine Runtime
               </h1>
               <p className="text-slate-500 text-sm mt-1">
                 Current Inference: <span className="font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{context}</span> | 
                 Heatmap Volume: <span className="font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs ml-1">{heatmapDensity}</span>
               </p>
             </div>
             
             <div className="flex gap-2">
               <button onClick={() => setContext('FOCUS')} className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${context === 'FOCUS' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Read Mode</button>
               <button onClick={() => setContext('DASHBOARD')} className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${context === 'DASHBOARD' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Dashboard Mode</button>
               <button onClick={simulateHeatmap} className="px-4 py-2 text-sm rounded-lg font-medium bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95">
                 <Eye size={16} /> Simulate Heatmap
               </button>
             </div>
          </div>

          {/* Generative Grid Layout */}
          <div 
             className="grid gap-6 transition-all duration-700" 
             style={{ gridTemplateColumns: `repeat(${cardGrid}, minmax(0, 1fr))` }}
          >
             {Array.from({ length: 12 }).map((_, index) => (
               <div 
                 key={index} 
                 className={`
                   anti-gravity
                   bg-white border border-slate-200 shadow-sm rounded-2xl p-6 transition-all duration-[800ms]
                   hover:-translate-y-2 hover:shadow-lg hover:border-blue-300
                   ${index === 0 && context === 'FOCUS' ? 'col-span-1 h-96' : 'h-48'}
                   ${index === 0 && context === 'DASHBOARD' ? 'col-span-full h-64' : ''}
                 `}
                 style={{ animationDelay: `${index * -0.7}s` }}
               >
                 <div className="h-full w-full bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <span className="font-mono text-xs opacity-50">GEN_BLOCK_{index}</span>
                 </div>
               </div>
             ))}
          </div>
        </main>
      </div>
    </div>
  );
}
