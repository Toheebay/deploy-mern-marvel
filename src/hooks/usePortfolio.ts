
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';

interface PortfolioItem {
  id: string;
  symbol: string;
  amount: number;
  price: number;
  createdAt: string;
}

export const usePortfolio = () => {
  const queryClient = useQueryClient();

  const { data: portfolio = [], isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: apiService.getPortfolio,
  });

  const addMutation = useMutation({
    mutationFn: ({ symbol, amount, price }: { symbol: string; amount: number; price: number }) =>
      apiService.addToPortfolio(symbol, amount, price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, amount, price }: { id: string; amount: number; price: number }) =>
      apiService.updatePortfolioItem(id, amount, price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => apiService.removeFromPortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  return {
    portfolio,
    loading: isLoading,
    error,
    addToPortfolio: addMutation.mutate,
    updatePortfolio: updateMutation.mutate,
    removeFromPortfolio: removeMutation.mutate,
  };
};
