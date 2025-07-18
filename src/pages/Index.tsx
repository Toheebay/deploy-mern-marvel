
import { CryptoHeader } from "@/components/crypto/CryptoHeader";
import { CryptoStats } from "@/components/crypto/CryptoStats";
import { CryptoTable } from "@/components/crypto/CryptoTable";
import { CryptoChart } from "@/components/crypto/CryptoChart";
import { useCrypto } from "@/hooks/useCrypto";

const Index = () => {
  const { cryptos, loading, error, selectedCrypto, setSelectedCrypto } = useCrypto();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Data</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <CryptoHeader />
        
        <div className="grid gap-6 mb-8">
          <CryptoStats cryptos={cryptos} loading={loading} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoTable 
              cryptos={cryptos} 
              loading={loading}
              onSelectCrypto={setSelectedCrypto}
              selectedCrypto={selectedCrypto}
            />
          </div>
          
          <div className="lg:col-span-1">
            <CryptoChart selectedCrypto={selectedCrypto} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
