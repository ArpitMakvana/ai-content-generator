export interface GenerateContentResponse {
  success: boolean;
  message: string;
  data: {
    topic: string;
    text: string | { error: boolean; message: string };
    imageUrls: string[] | { error: boolean; message: string };
    videoUrls: string[] | { error: boolean; message: string };
  };
}