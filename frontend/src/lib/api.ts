import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = '/api';

export interface AnalyzeResponse {
  filename: string;
  prediction: string;
  confidence: string;
  language: string;
  reasoning: string[];
}

interface AnalyzeRequest {
  file: File;
  language: string;
}

export const useAnalyzeAudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, language }: AnalyzeRequest): Promise<AnalyzeResponse> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
    },
  });
};

