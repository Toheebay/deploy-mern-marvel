
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useCrypto } from '@/hooks/useCrypto';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const PortfolioSummary = () => {
  const { portfolio, loading } = usePortfolio();
  const { cryptos } = useCrypto();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading portfolio...</div>
        </CardContent>
      </Card>
    );
  }

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total: number, item: any) => {
      const crypto = cryptos.find((c: any) => c.symbol.toLowerCase() === item.symbol.toLowerCase());
      if (crypto) {
        return total + (item.amount * crypto.current_price);
      }
      return total;
    }, 0);
  };

  const calculatePortfolioCost = () => {
    return portfolio.reduce((total: number, item: any) => {
      return total + (item.amount * item.price);
    }, 0);
  };

  const totalValue = calculatePortfolioValue();
  const totalCost = calculatePortfolioCost();
  const profitLoss = totalValue - totalCost;
  const profitLossPercentage = totalCost > 0 ? ((profitLoss / totalCost) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
          {profitLoss >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(profitLoss).toLocaleString()}
          </div>
          <p className={`text-xs ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitLoss >= 0 ? '+' : '-'}{Math.abs(profitLossPercentage).toFixed(2)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
