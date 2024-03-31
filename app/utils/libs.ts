import { jwtVerify } from 'jose';
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

export const isAuth = (): Promise<boolean> => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return isTokenValid(token).then((res) => res);
    }
    return Promise.resolve(false);
  }
  return Promise.resolve(false);
};

export const isTokenValid = async (token: string): Promise<boolean> => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
  const decoded = await jwtVerify(token, new TextEncoder().encode(secret), {
    algorithms: ['HS256'],
  }).catch(() => {
    return false;
  });
  return decoded ? true : false;
};

export const handleDownloadResume = async () => {
  try {
    const res = await fetch(`${baseUrl}/download/resume`, {
      method: 'GET',
    });
    const blob = await res.blob();
    const fileName = res.headers
      .get('Content-Disposition')
      ?.split('filename=')[1];

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || `NDACYAYISENGA Fabrice Resume.pdf`;
    a.click();
  } catch (e) {
    console.log(e);
  }
};
