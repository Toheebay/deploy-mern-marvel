
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const fetchCryptos = async () => {
  const response = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrency data');
  }
  
  return response.json();
};

export const useCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);

  const { 
    data: cryptos = [], 
    isLoading: loading, 
    error: queryError 
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });

  const error = queryError?.message || null;

  // Auto-select first crypto when data loads
  useEffect(() => {
    if (cryptos.length > 0 && !selectedCrypto) {
      setSelectedCrypto(cryptos[0]);
    }
  }, [cryptos, selectedCrypto]);

  return {
    cryptos,
    loading,
    error,
    selectedCrypto,
    setSelectedCrypto
  };
};
