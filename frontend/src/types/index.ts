export type HoodieColor = 'green' | 'black' | 'white';

export interface HoodieInfo {
  available: boolean;
  path: string | null;
}

export interface GeneratePortraitRequest {
  faceImage: string;
  color: HoodieColor;
  promptAdjustment?: string;
}

export interface GeneratePortraitResponse {
  success: boolean;
  image: string;
  filename: string;
  message: string;
}

export interface UploadHoodieResponse {
  success: boolean;
  message: string;
  color: HoodieColor;
  filename: string;
}

export interface ApiError {
  error: string;
}
