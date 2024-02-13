import Image, { StaticImageData } from 'next/image';

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  transparent?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  layout?: 'cover' | 'fill' | 'intrinsic' | 'responsive' | 'fixed';
};

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  transparent = true,
  objectFit = 'cover',
  layout = 'fixed',
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
      {...(transparent
        ? {
            placeholder: 'blur',
          }
        : {})}
    />
  );
};

export { ImageComponent as Image };
