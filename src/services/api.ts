// Centralized API Configuration & Service Client for Civora Backend Integration

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get JWT token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('civora_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('civora_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('civora_token');
};

// Generic fetch wrapper with headers and Auth handling
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return data;
}

// API Service Functions
export const api = {
  // Health
  checkHealth: () => apiFetch<{ status: string; message: string }>('/health'),

  // Auth
  register: (userData: any) =>
    apiFetch<{ success: boolean; data: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials: any) =>
    apiFetch<{ success: boolean; data: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiFetch<{ success: boolean; data: any }>('/auth/profile'),

  // Complaints
  createComplaint: (formData: FormData) =>
    apiFetch<{ success: boolean; data: any }>('/complaints', {
      method: 'POST',
      body: formData,
    }),

  getMyComplaints: () => apiFetch<{ success: boolean; count: number; data: any[] }>('/complaints/my'),

  getComplaintById: (id: string) => apiFetch<{ success: boolean; data: any }>(`/complaints/${id}`),

  // Water Schedules
  getWaterSchedules: (area?: string) =>
    apiFetch<{ success: boolean; count: number; data: any[] }>(
      `/water-schedule${area ? `?area=${encodeURIComponent(area)}` : ''}`
    ),

  // Garbage Schedules
  getGarbageSchedules: (area?: string) =>
    apiFetch<{ success: boolean; count: number; data: any[] }>(
      `/garbage-schedule${area ? `?area=${encodeURIComponent(area)}` : ''}`
    ),

  // Bills
  getMyBills: () => apiFetch<{ success: boolean; count: number; data: any[] }>('/bills'),

  getBillById: (id: string) => apiFetch<{ success: boolean; data: any }>(`/bills/${id}`),

  // Notifications
  getNotifications: () => apiFetch<{ success: boolean; count: number; data: any[] }>('/notifications'),

  markNotificationRead: (id: string) =>
    apiFetch<{ success: boolean; data: any }>(`/notifications/${id}/read`, {
      method: 'PUT',
    }),

  // Admin APIs
  admin: {
    getDashboardStats: () => apiFetch<{ success: boolean; data: any }>('/admin/dashboard/stats'),
    getRecentComplaints: () => apiFetch<{ success: boolean; count: number; data: any[] }>('/admin/dashboard/recent-complaints'),
    getCategoryStats: () => apiFetch<{ success: boolean; data: any[] }>('/admin/dashboard/category-stats'),
    getStatusStats: () => apiFetch<{ success: boolean; data: any[] }>('/admin/dashboard/status-stats'),
    getAllComplaints: (params?: any) => {
      const query = new URLSearchParams(params || {}).toString();
      return apiFetch<{ success: boolean; count: number; data: any[] }>(`/admin/complaints${query ? `?${query}` : ''}`);
    },
    updateComplaintStatus: (id: string, status: string, adminRemark?: string) =>
      apiFetch<{ success: boolean; data: any }>(`/admin/complaints/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status, adminRemark }),
      }),
    assignStaff: (id: string, staffId: string) =>
      apiFetch<{ success: boolean; data: any }>(`/admin/complaints/${id}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ staffId }),
      }),
    createWaterSchedule: (data: any) =>
      apiFetch<{ success: boolean; data: any }>('/admin/water-schedule', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    createGarbageSchedule: (data: any) =>
      apiFetch<{ success: boolean; data: any }>('/admin/garbage-schedule', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
