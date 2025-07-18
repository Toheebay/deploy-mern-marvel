
import { TrendingUp, Activity } from "lucide-react";

export const CryptoHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          <p className="text-muted-foreground">Real-time cryptocurrency prices and market data</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Activity className="w-4 h-4" />
        <span>Live Data</span>
      </div>
    </div>
  );
};
