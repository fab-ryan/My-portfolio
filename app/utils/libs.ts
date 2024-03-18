export const baseUrl: NonNullable<string | undefined> =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const getPlaceholderImageURL = (imageURL: string): string => {
  return `/_next/image?url=${encodeURIComponent(imageURL)}&q=9&w=500`;
};

export const authToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};
