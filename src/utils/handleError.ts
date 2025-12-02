import axios from 'axios';

export default function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    // Axios-specific error
    console.error('Axios error message:', error.message);

    if (error.response) {
      // Server responded with a status out of 2xx
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // No response was received
      console.error('Request made but no response:', error.request);
      throw new Error('No response was received!');
    } else {
      // Something happened while setting up the request
      console.error('Error setting up request:', error.message);
      throw new Error('Something happened while setting up the request!');
    }
  } else {
    // Non-Axios error
    console.error('Unexpected error:', error);
    throw new Error(error);
  }
}
