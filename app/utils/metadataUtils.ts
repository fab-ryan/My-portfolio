import { BlogResponse } from '@/types';
import type { Metadata, ResolvingMetadata } from 'next';
import { baseUrl } from './libs';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data: BlogResponse = await fetch(
    `${baseUrl}/blogs/${params.slug}`,
  ).then((res) => res.json() as Promise<BlogResponse>);
  const blog = data.data;
  const previousImage = (await parent).openGraph?.images || [];
  return {
    title: blog?.title,
    description: blog?.preview,
    openGraph: {
      type: 'website',
      title: blog?.title,
      description: blog?.preview,
      images: [
        {
          url: blog?.image,
          width: 900,
          height: 900,
          alt: blog?.title,
        },
        ...previousImage,
      ],
    },
  };
}
