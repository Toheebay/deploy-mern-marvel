
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CryptoStatsProps {
  cryptos: any[];
  loading: boolean;
}

export const CryptoStats = ({ cryptos, loading }: CryptoStatsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + (crypto.market_cap || 0), 0);
  const totalVolume = cryptos.reduce((sum, crypto) => sum + (crypto.total_volume || 0), 0);
  const avgChange = cryptos.reduce((sum, crypto) => sum + (crypto.price_change_percentage_24h || 0), 0) / cryptos.length;
  const gainers = cryptos.filter(crypto => (crypto.price_change_percentage_24h || 0) > 0).length;

  const formatValue = (value: number, prefix = "$") => {
    if (value >= 1e12) return `${prefix}${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${prefix}${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${prefix}${(value / 1e6).toFixed(2)}M`;
    return `${prefix}${value.toLocaleString()}`;
  };

  const stats = [
    {
      title: "Total Market Cap",
      value: formatValue(totalMarketCap),
      icon: DollarSign,
      trend: avgChange > 0 ? "up" : "down",
      change: `${avgChange.toFixed(2)}%`
    },
    {
      title: "24h Volume",
      value: formatValue(totalVolume),
      icon: BarChart3,
      trend: "neutral",
      change: "Volume"
    },
    {
      title: "Gainers",
      value: `${gainers}/${cryptos.length}`,
      icon: TrendingUp,
      trend: "up",
      change: "Assets up"
    },
    {
      title: "Market Trend",
      value: avgChange > 0 ? "Bullish" : "Bearish",
      icon: avgChange > 0 ? TrendingUp : TrendingDown,
      trend: avgChange > 0 ? "up" : "down",
      change: `${Math.abs(avgChange).toFixed(2)}%`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center gap-1 ${
              stat.trend === "up" ? "text-green-600" : 
              stat.trend === "down" ? "text-red-600" : 
              "text-muted-foreground"
            }`}>
              {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
              {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
