import { data } from '~/lib/data';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (
  str: string,
  length?: number,
  fromMiddle?: boolean
) => {
  const middle = fromMiddle ?? true;
  const len = length ?? 20;
  if (str.length <= len) {
    return str;
  }
  if (middle) {
    return `${str.slice(0, len / 2)}...${str.slice(-len / 2)}`;
  }
  return `${str.slice(0, len)}...`;
};

export const errorHandler = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  } else if (
    error &&
    typeof error === 'object' &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    return error.error;
  }
  return 'An error occurred';
};

// Function to detect Japanese characters
const containsJapanese = (text: string): boolean => {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/;
  return japaneseRegex.test(text);
};

// Mapping for custom blog images from public folder
const customBlogImages: Record<string, string> = {
  'Exploring the Mina Ecosystem: A Deep Dive into Top 5 and Upcoming zkApps and Grant Program Projects': '/minablog.jpg',
  'UpLink-AVS: An AVS to determine whether an endpoint is up/down and confirm on-chain.': '/uplink-avs.png',
  'Unleashing the Power of Decentralization and Blockchain Technology with XPLA': '/xpla.png',
  'Empowering Change Through Technology: My Journey at the Hackathon of Hope with Celo 🎬': '/hackathon.png',
};

export interface Post {
  title: string;
  url: string;
  coverImage: { url: string; attribution: string | null } | null;
}

// Helper function to get image URL for a post
export const getPostImageUrl = (post: Post): string => {
  // Check if there's a custom image for this title
  const customImage = customBlogImages[post.title];
  if (customImage) {
    return customImage;
  }
  // Use the cover image from Hashnode if available
  const coverImageUrl = post.coverImage?.url;
  if (coverImageUrl) {
    return coverImageUrl;
  }
  // Fallback to default image
  return '/default.png';
};


export const getPosts = async () => {
  try {
    const query = `
    query GetPosts {
      publication(host: "${data.articles.hashnodeHostname}") {
        posts(first: 20) {
          edges {
            node {
              title
              url
              coverImage {
                url
                attribution
              }
            }
          }
        }
      }
    }
  `;

    const res = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const posts = (await res.json()) as {
      data: {
        publication: {
          posts: {
            edges: {
              node: {
                title: string;
                url: string;
                coverImage: { url: string; attribution: string | null } | null;
              };
            }[];
          };
        };
      };
    };

    return posts.data.publication.posts.edges.map(({ node }) => node).filter((post) => !containsJapanese(post.title));
  } catch (error) {
    console.log({ error });
    return [];
  }
};
