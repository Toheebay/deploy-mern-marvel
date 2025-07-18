
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

interface CryptoChartProps {
  selectedCrypto: any;
}

export const CryptoChart = ({ selectedCrypto }: CryptoChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Generate mock chart data for demonstration
  useEffect(() => {
    if (selectedCrypto) {
      const generateData = () => {
        const data = [];
        const basePrice = selectedCrypto.current_price;
        const variation = basePrice * 0.1; // 10% variation
        
        for (let i = 23; i >= 0; i--) {
          const randomChange = (Math.random() - 0.5) * variation;
          const price = basePrice + randomChange;
          data.push({
            time: `${i}h ago`,
            price: Math.max(0, price),
            volume: Math.random() * 1000000
          });
        }
        return data.reverse();
      };
      
      setChartData(generateData());
    }
  }, [selectedCrypto]);

  if (!selectedCrypto) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Select a cryptocurrency to view its chart</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const priceChange = selectedCrypto.price_change_percentage_24h;
  const isPositive = priceChange > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={selectedCrypto.image} 
              alt={selectedCrypto.name}
              className="w-6 h-6 rounded-full"
            />
            {selectedCrypto.name}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${!isPositive ? 'rotate-180' : ''}`} />
            {Math.abs(priceChange).toFixed(2)}%
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            ${selectedCrypto.current_price.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 6 
            })}
          </div>
          <div className="text-sm text-muted-foreground">
            24h Volume: ${selectedCrypto.total_volume?.toLocaleString() || 'N/A'}
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={['dataMin', 'dataMax']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: any) => [`$${value.toFixed(6)}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#16a34a' : '#dc2626'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
