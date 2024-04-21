import { getPlaceholderImageURL } from '@/utils';
import Image, { StaticImageData } from 'next/image';

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number ;
  transparent?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  layout?: 'cover' | 'fill' | 'intrinsic' | 'responsive' | 'fixed';
  blurDataURL?: string;
};

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  transparent = true,
  objectFit = 'cover',
  layout = 'fixed',
  blurDataURL,
  
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={layout == 'fill'}
      layout={layout}
      objectFit={objectFit}
      placeholder={transparent ? 'empty' : 'blur'}
      blurDataURL={getPlaceholderImageURL(src as string)}
    />
  );
};

export { ImageComponent as Image };
