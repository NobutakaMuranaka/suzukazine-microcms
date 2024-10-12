import type { MicroCMSDate, MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';
import { MetadataRoute } from 'next';

interface Article {
  id: string;
  date: MicroCMSDate;
  title: string;
  description?: string;
  image?: MicroCMSImage;
}

const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_API_URL || '',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || ''
});

async function getWorks(queries?: MicroCMSQueries) {
  const listData = await client.getList<Article>({
    endpoint: 'blog',
    queries
  });

  return listData;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  const { contents } = await getWorks();
  const lastModified = new Date();

  const staticPaths = [{
    url: baseURL,
    lastModified
  }];

  const dynamicPaths = contents.map(({ id }) => {
    return {
      url: `${baseURL}/blog/${id}`,
      lastModified
    };
  });

  return [ ...staticPaths, ...dynamicPaths ];
}