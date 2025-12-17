import { useEffect, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useAppStore } from '../../lib/store';
import { AppNode } from '../../types';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Cpu, HardDrive, MemoryStick, Database, Server, Box } from 'lucide-react';

const ICONS = { Database: Database, Service: Server, Cache: Box };

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { getNode, updateNodeData } = useReactFlow<AppNode>();
  
  // Local state for smooth interaction
  const [localTraffic, setLocalTraffic] = useState(0);
  const [localLabel, setLocalLabel] = useState("");

  const node = selectedNodeId ? getNode(selectedNodeId) : null;

  useEffect(() => {
    if (node) {
      setLocalTraffic(node.data.traffic || 0);
      setLocalLabel(node.data.label || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.id]);

  if (!node) return <div className="p-6 text-center text-muted-foreground">Select a node to view details</div>;

  const Icon = ICONS[node.data.type] || Server;
  const isSuccess = node.data.status === 'Success';
  const StatusIcon = isSuccess ? CheckCircle2 : XCircle;
  const statusColor = isSuccess ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20';

  const handleTrafficChange = (val: number) => {
    setLocalTraffic(val);
    updateNodeData(node.id, { traffic: val });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalLabel(newVal);
    updateNodeData(node.id, { label: newVal });
  };

  return (
    <div className="h-full flex flex-col gap-4 bg-background p-1">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="p-2 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              <CardTitle className="text-base font-bold">{localLabel}</CardTitle>
            </div>
            <Badge variant="outline" className={`flex items-center gap-1 pl-1 pr-2 py-0.5 ${statusColor}`}>
              <StatusIcon className="w-3.5 h-3.5" /> {node.data.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>
      <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-secondary/50">
          <TabsTrigger value="config" className="gap-2"><Cpu className="w-4 h-4"/>Specs</TabsTrigger>
          <TabsTrigger value="runtime" className="gap-2"><MemoryStick className="w-4 h-4"/>Runtime</TabsTrigger>
          <TabsTrigger value="logs" className="gap-2"><HardDrive className="w-4 h-4"/>Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="config" className="space-y-6 pt-4 px-2">
          <div className="space-y-3">
            <Label>Name</Label>
            <Input 
              value={localLabel} 
              onChange={handleLabelChange} 
              className="bg-secondary/50" 
            />
          </div>
          
          <div className="space-y-3 bg-secondary/30 p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-muted-foreground"/>
                 <Label>CPU Allocation</Label>
              </div>
              <span className="font-mono text-sm">{localTraffic.toFixed(2)}%</span>
            </div>
            <Slider value={[localTraffic]} max={100} step={1} onValueChange={(vals) => handleTrafficChange(vals[0])} className="py-2" />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
               <span>0%</span><span>100%</span>
            </div>
          </div>

           <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-secondary/30 p-3 rounded-lg border space-y-1">
                 <span className="text-xs text-muted-foreground">Memory</span>
                 <div className="font-mono">{node.data.specs?.memory || '0 GB'}</div>
              </div>
              <div className="bg-secondary/30 p-3 rounded-lg border space-y-1">
                 <span className="text-xs text-muted-foreground">Region</span>
                 <div>{node.data.region || 'us-east-1'}</div>
              </div>
           </div>
        </TabsContent>
        <TabsContent value="runtime" className="p-4 text-sm text-muted-foreground">Runtime metrics placeholder.</TabsContent>
      </Tabs>
    </div>
  );
}