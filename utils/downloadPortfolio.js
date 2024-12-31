import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const downloadPortfolio = async (userId) => {
  const toastId = toast.loading('Downloading portfolio...');
  
  try {
    const response = await api.get(`/portfolio/download/${userId}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/zip',
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        toast.update(toastId, { 
          render: `Downloading: ${percentCompleted}%`
        });
      },
    });

    if (!response.data) {
      throw new Error('No data received');
    }

    const contentType = response.headers['content-type'];
    if (contentType !== 'application/zip') {
      throw new Error(`Invalid file type: ${contentType}`);
    }

    const filename = response.headers['content-disposition']?.split('filename=')[1] || 'portfolio.zip';
    const downloadUrl = window.URL.createObjectURL(response.data);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    
    link.click();
    
    window.URL.revokeObjectURL(downloadUrl);
    toast.update(toastId, {
      render: 'Download completed!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

  } catch (error) {
    console.error('Download error:', error);
    toast.update(toastId, {
      render: error.message || 'Download failed',
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    });
  }
};