import axios from 'axios';
import type {
  HoodieColor,
  HoodieInfo,
  GeneratePortraitRequest,
  GeneratePortraitResponse,
  UploadHoodieResponse,
  ApiError
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health');
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

export const uploadHoodie = async (
  file: File,
  color: HoodieColor
): Promise<UploadHoodieResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('color', color);

  const response = await api.post<UploadHoodieResponse>(
    '/api/upload-hoodie',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const getHoodies = async (): Promise<Record<HoodieColor, HoodieInfo>> => {
  const response = await api.get<Record<HoodieColor, HoodieInfo>>('/api/hoodies');
  return response.data;
};

export const getHoodieImage = async (color: HoodieColor): Promise<string> => {
  const response = await api.get<{ color: HoodieColor; image: string }>(
    `/api/hoodie-image/${color}`
  );
  return response.data.image;
};

export const generatePortrait = async (
  request: GeneratePortraitRequest
): Promise<GeneratePortraitResponse> => {
  const response = await api.post<GeneratePortraitResponse>(
    '/api/generate-portrait',
    request
  );
  return response.data;
};

export const downloadPortrait = (filename: string): string => {
  return `${API_BASE_URL}/api/download/${filename}`;
};

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError | undefined;
    return apiError?.error || error.message || 'An unexpected error occurred';
  }
  return 'An unexpected error occurred';
};
