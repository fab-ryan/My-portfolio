'use client';

import Head from 'next/head';
import { BlogContents } from '../blogContent';

import { generateMetadata } from '@/utils/metadataUtils';
import { useEffect, useState } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

export default function Page({ params }: { params: { slug: string } }) {
  const [metadata, setMatadata] = useState<Metadata | null>(null);
  useEffect(() => {
    async function fetchMetadata() {
      const data = await generateMetadata({ params }, {} as ResolvingMetadata);
      setMatadata(data);
      if (data) {
        updateDocumentHead(data);
      }
    }
    fetchMetadata();
  }, [params]);

  const updateDocumentHead = (metadata: Metadata) => {
    const head = document.querySelector('head') as HTMLHeadElement;

    if (head) {
      const title = head.querySelector('title');
      if (title) {
        title.innerHTML = metadata?.title as string;
      }
      const descriptionTag = head.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute('content', metadata?.description as string);
      } else {
        const newDescriptionTag = document.createElement('meta');
        newDescriptionTag.setAttribute('name', 'description');
        newDescriptionTag.setAttribute(
          'content',
          metadata?.description as string,
        );
        head.appendChild(newDescriptionTag);
      }
      const icon = head.querySelector('link[rel="icon"]');
      if (icon) {
        const ogTags = head.querySelectorAll('meta[property^="og:"]');
        ogTags.forEach((tag) => {
          tag.remove();

          const newTag = document.createElement('meta');
          newTag.setAttribute(
            'property',
            tag.getAttribute('property') as string,
          );
          newTag.setAttribute('content', tag.getAttribute('content') as string);
          head.appendChild(newTag);
        });
      }
    }
  };

  if (!metadata) return null;
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => {
          if (key === 'openGraph') {
            return Object.entries(value).map(([ogKey, ogValue]) => {
              return (
                <meta
                  key={ogKey}
                  property={`og:${ogKey}`}
                  content={ogValue as string}
                />
              );
            });
          }
          return (
            <meta
              key={key}
              name={key}
              content={value}
            />
          );
        })}
      </Head>
      <BlogContents slug={params.slug} />
    </>
  );
}
