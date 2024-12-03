const backendUrl = 'https://evagallery.b-cdn.net'; // https://evagallery.b-cdn.net / process.env.NEXT_PUBLIC_BACKEND_URL || 
const placeholderImage = '/images/placeholder.png';

export async function getImageData(endpoint: string): Promise<string> {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Get the content type from the response headers
    const contentType = response.headers.get('content-type');
    
    // Check if the response is an image type
    if (contentType && contentType.startsWith('image/')) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      console.error('Response is not an image:', contentType);
      return placeholderImage;
    }
  } catch (err) {
    console.error('Image loading error:', err);
    return placeholderImage;
  }
}