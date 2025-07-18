
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Portfolio endpoints
  async getPortfolio() {
    return this.request('/portfolio');
  }

  async addToPortfolio(symbol: string, amount: number, price: number) {
    return this.request('/portfolio', {
      method: 'POST',
      body: JSON.stringify({ symbol, amount, price }),
    });
  }

  async updatePortfolioItem(id: string, amount: number, price: number) {
    return this.request(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ amount, price }),
    });
  }

  async removeFromPortfolio(id: string) {
    return this.request(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  // Watchlist endpoints
  async getWatchlist() {
    return this.request('/watchlist');
  }

  async addToWatchlist(symbol: string) {
    return this.request('/watchlist', {
      method: 'POST',
      body: JSON.stringify({ symbol }),
    });
  }

  async removeFromWatchlist(symbol: string) {
    return this.request(`/watchlist/${symbol}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
