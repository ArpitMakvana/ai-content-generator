export interface GenerateContentResponse {
  success: boolean;
  message: string;
  data: {
    topic: string;
    text: string | ApiError;
    imageUrls: Record<string, string[]> | ApiError;
    videoUrls: Record<string, string[]> | ApiError;
  };
}
export  interface ApiError {
  error: true;
  message: string;
}