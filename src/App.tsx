import { useState, useEffect, useCallback } from 'react';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { AppLayout } from './components/layout/AppLayout';
import { FlowCanvas } from './components/flow/FlowCanvas';
import { NodeInspector } from './components/inspector/NodeInspector';
import { useAppStore } from './lib/store';
import { fetchApps, fetchGraph } from './lib/api';
import { Search, Plus, MoreHorizontal, Lightbulb, Box, Rocket, Terminal } from 'lucide-react';
import { Input } from './components/ui/input';
import { AppNode } from './types';
const queryClient = new QueryClient();
const getAppIcon = (name: string) => {
  if (name.includes('go')) return <Lightbulb className="w-5 h-5" />;
  if (name.includes('python')) return <Rocket className="w-5 h-5" />;
  if (name.includes('java')) return <Box className="w-5 h-5" />;
  return <Terminal className="w-5 h-5" />;
}
function AinyxApp() {
  const { selectedAppId, setSelectedApp } = useAppStore();
  const { data: apps } = useQuery({ queryKey: ['apps'], queryFn: fetchApps });
  const { data: graphData, isLoading } = useQuery({ queryKey: ['graph', selectedAppId], queryFn: () => fetchGraph(selectedAppId!), enabled: !!selectedAppId });
  const { addNodes, fitView } = useReactFlow();
  const [showLeftPanel, setShowLeftPanel] = useState(true); 
  const selectedAppName = apps?.find(a => a.id === selectedAppId)?.name || 'Select App';
  const handleAddNode = useCallback(() => {
    const id = `node-${Date.now()}`;
    const newNode: AppNode = {
      id,
      position: { x: Math.random() * 400, y: Math.random() * 400 }, 
      type: 'custom',
      data: {
        label: 'New Service',
        type: 'Service',
        status: 'Success',
        traffic: 0,
        cost: '$0.01/HR',
        region: 'us-east-1',
        specs: { cpu: '0.1', memory: '0.5 GB', disk: '10 GB' }
      }
    };
    addNodes(newNode);
  }, [addNodes]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        fitView({ duration: 500 });
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        setShowLeftPanel(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fitView]);
  return (
    <AppLayout rightPanel={<NodeInspector />}>
      {}
      <div 
        className={`absolute top-4 left-4 z-20 w-72 bg-card border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          showLeftPanel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
        }`}
      >
         <div className="flex items-center justify-between p-4 border-b bg-secondary/30">
            <div className="flex items-center gap-2 font-semibold">
               {getAppIcon(selectedAppName)}
               <span>{selectedAppName}</span>
            </div>
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
         </div>
         <div className="p-4 space-y-4">
            <h3 className="font-semibold">Application</h3>
            <div className="flex gap-2">
               <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8 bg-background" />
               </div>
               {}
               <button 
                onClick={handleAddNode}
                className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                title="Add Service Node"
               >
                 <Plus className="w-5 h-5"/>
               </button>
            </div>
            <div className="space-y-1">
            {apps?.map((app) => {
               const isSelected = selectedAppId === app.id;
               return (
              <button key={app.id} onClick={() => setSelectedApp(app.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${isSelected ? 'bg-secondary' : 'hover:bg-secondary/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md text-white ${app.iconBg}`}>{getAppIcon(app.name)}</div>
                  <span className="font-medium">{app.name}</span>
                </div>
                <span className="text-muted-foreground">›</span>
              </button>
            )})}
            </div>
            <div className="pt-2 border-t text-[10px] text-muted-foreground flex justify-between">
              <span>Shift+F: Fit View</span>
              <span>Ctrl+B: Toggle</span>
            </div>
         </div>
      </div>
      {isLoading ? <div className="flex h-full items-center justify-center animate-pulse">Loading...</div> : 
      <FlowCanvas initialNodes={graphData?.nodes || []} initialEdges={graphData?.edges || []} />}
    </AppLayout>
  );
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider><AinyxApp /></ReactFlowProvider>
    </QueryClientProvider>
  );
}