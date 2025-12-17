import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppNodeData, MetricTab } from '../../types';
import { Database, Server, Box, Settings, CheckCircle2, XCircle, Cpu, HardDrive, MemoryStick, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = { Database: Database, Service: Server, Cache: Box };

const TabButton = ({ 
  tab, 
  icon: TabIcon, 
  activeTab, 
  setActiveTab, 
  value 
}: { 
  tab: MetricTab; 
  icon: LucideIcon; 
  activeTab: MetricTab; 
  setActiveTab: (t: MetricTab) => void; 
  value: string;
}) => (
  <button 
    onClick={() => setActiveTab(tab)}
    className={cn("flex flex-1 flex-col items-center p-2 rounded-md transition-colors", activeTab === tab ? "bg-secondary" : "hover:bg-secondary/50")}
  >
    <span className="text-[10px] text-muted-foreground mb-1">{value}</span>
    <div className={cn("flex items-center gap-1 text-xs font-medium", activeTab === tab ? "text-foreground" : "text-muted-foreground")}>
      <TabIcon className="w-3 h-3" /> {tab}
    </div>
  </button>
);

 
export const ServiceNode = memo(({ data, selected }: NodeProps<AppNodeData>) => {
  const Icon = ICONS[data.type] || Server;
  const [activeTab, setActiveTab] = useState<MetricTab>('CPU');
  
  const isSuccess = data.status === 'Success';
  const StatusIcon = isSuccess ? CheckCircle2 : XCircle;
  const statusColor = isSuccess ? 'text-green-500' : 'text-red-500';
  const statusBg = isSuccess ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20';

  return (
    <Card className={cn("w-[340px] border-2 shadow-xl transition-all duration-200 bg-card", selected ? 'border-primary' : 'border-border')}>
      <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3 opacity-0" />
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <Icon className="w-6 h-6 text-foreground" />
            <span className="text-lg font-bold">{data.label}</span>
          </div>
           <div className="flex items-center gap-2">
             <Badge variant="outline" className="text-green-400 border-green-400/30 font-mono">{data.cost}</Badge>
             <Settings className="w-4 h-4 text-muted-foreground" />
           </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between gap-2 bg-background/50 p-1 rounded-lg">
           <TabButton tab="CPU" icon={Cpu} activeTab={activeTab} setActiveTab={setActiveTab} value={data.specs.cpu} />
           <TabButton tab="Memory" icon={MemoryStick} activeTab={activeTab} setActiveTab={setActiveTab} value={data.specs.memory} />
           <TabButton tab="Disk" icon={HardDrive} activeTab={activeTab} setActiveTab={setActiveTab} value={data.specs.disk} />
           <div className="flex flex-1 flex-col items-center p-2">
              <span className="text-[10px] text-muted-foreground mb-1">1</span>
              <span className="text-xs text-muted-foreground">Region</span>
           </div>
        </div>

        <div className="space-y-2">
           <div className="flex justify-end">
              <span className="font-mono text-sm">{data.traffic.toFixed(2)}</span>
           </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden relative">
             <div className={cn("absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-sm")} style={{ left: `calc(${data.traffic}% - 6px)` }} />
            <div className={cn("h-full transition-all duration-300 ease-out", activeTab === 'CPU' ? 'bg-blue-500' : activeTab === 'Memory' ? 'bg-purple-500' : 'bg-orange-500')} style={{ width: `${data.traffic}%` }} />
          </div>
        </div>

        <div className="flex justify-between items-end pt-2">
           <Badge variant="outline" className={cn("flex items-center gap-1 pl-1 pr-2 py-0.5 font-medium transition-colors", statusBg, statusColor)}>
              <StatusIcon className="w-3.5 h-3.5" /> {data.status}
           </Badge>
           <svg className="h-6 w-auto text-[#FF9900]" viewBox="0 0 72 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M45.3875 0C44.8521 0 44.3411 0.177872 43.9085 0.527648L36.5391 5.92617C36.1183 6.23484 35.8795 6.74182 35.8959 7.26653C35.9124 7.79125 36.1832 8.28396 36.6248 8.56838C42.0593 12.0619 45.5276 16.6851 45.5276 21.6841C45.5276 27.1625 41.2988 32.1878 34.5424 34.7614C32.9643 35.3626 31.3235 35.8142 29.6604 36.1101V25.9349C29.6604 25.187 29.1666 24.5344 28.4884 24.338L18.9996 21.5965L9.51082 24.338C8.8326 24.5344 8.33885 25.187 8.33885 25.9349V36.1101C6.67579 35.8142 5.03498 35.3626 3.45686 34.7614C2.01535 34.2122 0.952624 32.9241 0.952624 31.3933C0.952624 25.5298 9.35842 20.4553 18.9996 20.4553C24.9279 20.4553 30.3791 22.2475 34.0866 25.0653C34.5466 25.4143 35.1487 25.5379 35.7026 25.3762C36.2566 25.2146 36.6943 24.7873 36.8912 24.2467C38.4888 19.8686 39.3586 15.2216 39.3586 10.4776C39.3586 6.98896 38.8887 3.55204 38.0014 0.201873C37.8559 -0.325778 38.3823 -0.82032 38.8789 -0.606867C40.9975 0.304455 43.2048 0.77939 45.4845 0.77939C46.1509 0.77939 46.8093 0.749627 47.4583 0.692364C47.9825 0.646046 48.3861 0.199845 48.3861 -0.32666C48.3861 -0.853165 47.9825 -1.29937 47.4583 -1.34568C46.8093 -1.40295 46.1509 -1.43271 45.4845 -1.43271C43.7944 -1.43271 42.1372 -1.2041 40.5414 -0.781722V10.4776C40.5414 15.5713 39.6145 20.5643 37.8931 25.2667C43.1659 30.0155 46.6231 35.6483 46.6231 41.7146C46.6231 47.7808 43.1659 53.4137 37.8931 58.1624C36.1718 56.6316 34.3642 55.2516 32.4882 54.0359L25.1189 48.6373C24.6863 48.3205 24.1753 48.1426 23.6399 48.1426C23.1045 48.1426 22.5935 48.3205 22.1609 48.6373L14.7915 54.0359C12.9155 55.2516 11.108 56.6316 9.38664 58.1624C4.11385 53.4137 0.656631 47.7808 0.656631 41.7146C0.656631 35.6483 4.11385 30.0155 9.38664 25.2667V36.1101C8.22135 36.5201 7.09429 37.0005 6.01279 37.5446C2.87555 39.1237 0.952624 42.2987 0.952624 45.8131C0.952624 52.1403 9.35842 57.5325 18.9996 57.5325C28.6408 57.5325 37.0466 52.1403 37.0466 45.8131C37.0466 43.6274 36.2304 41.5715 34.7967 39.7635C33.9098 38.6447 32.8232 37.6552 31.5882 36.8168L24.2188 31.4183C23.7862 31.1015 23.2752 30.9235 22.7399 30.9235C22.2045 30.9235 21.6935 31.1015 21.2609 31.4183L13.8915 36.8168C12.6565 37.6552 11.5698 38.6447 10.6829 39.7635C9.24924 41.5715 8.43303 43.6274 8.43303 45.8131C8.43303 48.0256 9.27425 50.1088 10.7516 51.9408C11.9574 53.4366 13.5154 54.7457 15.3139 55.7835C17.8886 57.2698 21.0589 58.1426 24.5475 58.1426C28.0361 58.1426 31.2064 57.2698 33.7812 55.7835C35.5797 54.7457 37.1377 53.4366 38.3435 51.9408C39.8208 50.1088 40.6621 48.0256 40.6621 45.8131C40.6621 42.2987 38.7391 39.1237 35.6019 37.5446C34.5204 37.0005 33.3933 36.5201 32.228 36.1101V25.9349C33.1344 26.1182 33.9974 26.4597 34.7808 26.9457L42.1502 32.3442C42.5828 32.6611 43.0938 32.839 43.6292 32.839C44.1646 32.839 44.6756 32.6611 45.1082 32.3442L52.4776 26.9457C54.3536 25.5713 56.1612 24.0405 57.8825 22.3665C63.1553 17.1152 66.6124 10.8823 66.6124 4.21609C66.6124 -2.45015 63.1553 -8.68303 57.8825 -13.9343C56.1612 -15.6084 54.3536 -17.1391 52.4776 -18.5136L45.1082 -23.9121C44.6756 -24.2289 44.1646 -24.4069 43.6292 -24.4069C43.0938 -24.4069 42.5828 -24.2289 42.1502 -23.9121L34.7808 -18.5136C32.9048 -17.1391 31.0972 -15.6084 29.376 -13.9343C24.1032 -8.68303 20.646 -2.45015 20.646 4.21609C20.646 10.8823 24.1032 17.1152 29.376 22.3665V36.1101C28.2107 36.5201 27.0836 37.0005 26.0021 37.5446C22.8649 39.1237 20.9419 42.2987 20.9419 45.8131C20.9419 52.1403 29.3477 57.5325 38.9889 57.5325C48.6301 57.5325 57.0359 52.1403 57.0359 45.8131C57.0359 43.6274 56.2197 41.5715 54.786 39.7635C53.8991 38.6447 52.8125 37.6552 51.5775 36.8168L44.2081 31.4183C43.7755 31.1015 43.2645 30.9235 42.7291 30.9235C42.1938 30.9235 41.6828 31.1015 41.2502 31.4183L33.8808 36.8168C32.6458 37.6552 31.5591 38.6447 30.6722 39.7635C29.2385 41.5715 28.4223 43.6274 28.4223 45.8131C28.4223 48.0256 29.2635 50.1088 30.7409 51.9408C31.9467 53.4366 33.5047 54.7457 35.3032 55.7835C37.8779 57.2698 41.0482 58.1426 44.5368 58.1426C48.0254 58.1426 51.1957 57.2698 53.7705 55.7835C55.5689 54.7457 57.127 53.4366 58.3328 51.9408C59.8101 50.1088 60.6514 48.0256 60.6514 45.8131C60.6514 42.2987 58.7284 39.1237 55.5912 37.5446C54.5097 37.0005 53.3826 36.5201 52.2173 36.1101V25.9349C53.8914 25.6389 55.5322 25.1874 57.1953 24.5862C63.9517 22.0126 68.1805 16.9873 68.1805 11.5089C68.1805 6.50984 64.7122 1.88665 59.2777 -1.60687C58.8361 -1.89129 58.5653 -2.384 58.5488 -2.90872C58.5324 -3.43344 58.7712 -3.94042 59.192 -4.24909L66.5614 -9.64762C66.994 -9.96445 67.505 -10.1423 68.0404 -10.1423C68.5758 -10.1423 69.0868 -9.96445 69.5194 -9.64762L76.8888 -4.24909C78.7648 -3.03338 80.5723 -1.65341 82.2937 -0.122654C87.5665 4.62611 91.0237 10.2589 91.0237 16.3252C91.0237 22.3914 87.5665 28.0243 82.2937 32.773C80.5723 34.3037 78.7648 35.6837 76.8888 36.8994L69.5194 42.2979C69.0868 42.6148 68.5758 42.7927 68.0404 42.7927C67.505 42.7927 66.994 42.6148 66.5614 42.2979L59.192 36.8994C57.316 35.6837 55.5085 34.3037 53.7871 32.773C48.5143 28.0243 45.0571 22.3914 45.0571 16.3252C45.0571 11.358 47.1177 6.61944 50.7464 2.63402C47.2287 4.20604 45.0571 7.75569 45.0571 11.5089C45.0571 16.508 48.5254 21.1311 53.9599 24.6247C54.4015 24.9091 54.6723 25.4018 54.6888 25.9265C54.7052 26.4513 54.4664 26.9582 54.0456 27.2669L46.6762 32.6654C46.2436 32.9822 45.7326 33.1602 45.1972 33.1602C44.6618 33.1602 44.1508 32.9822 43.7182 32.6654L36.3488 27.2669C34.4728 26.0512 32.6652 24.6712 30.9439 23.1405C25.6711 18.3917 22.2139 12.7589 22.2139 6.69262C22.2139 1.72538 24.2745 -3.01318 27.9032 -6.9986C24.3854 -5.42658 22.2139 -1.87693 22.2139 1.87627C22.2139 6.87535 25.6822 11.4985 31.1167 14.9921C31.5583 15.2765 31.8291 15.7692 31.8456 16.2939C31.8621 16.8187 31.6233 17.3256 31.2025 17.6343L23.8331 23.0328C23.4005 23.3497 22.8895 23.5276 22.3541 23.5276C21.8187 23.5276 21.3077 23.3497 20.8751 23.0328L13.5057 17.6343C11.6297 16.4186 9.82218 15.0386 8.10082 13.5079C2.82804 8.75913 -0.62915 3.12628 -0.62915 -2.93998C-0.62915 -7.90722 1.43144 -12.6458 5.06016 -16.6312C1.54241 -15.0592 -0.62915 -11.5095 -0.62915 -7.75634C-0.62915 -2.75727 2.83915 1.86589 8.27364 5.35947C8.71523 5.64389 8.98603 6.13661 9.00249 6.66133C9.01895 7.18605 8.78014 7.69303 8.35935 8.0017L0.989963 13.4002C0.557392 13.7171 0.0463762 13.895 0 13.895V13.895Z"/></svg>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3 opacity-0" />
    </Card>
  );
});