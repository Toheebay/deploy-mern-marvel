
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const useWatchlist = () => {
  const queryClient = useQueryClient();

  const { data: watchlist = [], isLoading, error } = useQuery({
    queryKey: ['watchlist'],
    queryFn: apiService.getWatchlist,
  });

  const addMutation = useMutation({
    mutationFn: (symbol: string) => apiService.addToWatchlist(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (symbol: string) => apiService.removeFromWatchlist(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });

  const isInWatchlist = (symbol: string) => {
    return watchlist.some((item: any) => item.symbol === symbol);
  };

  return {
    watchlist,
    loading: isLoading,
    error,
    addToWatchlist: addMutation.mutate,
    removeFromWatchlist: removeMutation.mutate,
    isInWatchlist,
  };
};
