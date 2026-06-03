import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Premium social bookmarking',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Bookmarks', href: '/sbm' },
      { label: 'Articles', href: '/article' },
      { label: 'Listings', href: '/listing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse now', href: '/sbm' },
      secondary: { label: 'Submit', href: '/create' },
    },
  },
  footer: {
    tagline: 'Curated links, visual discoveries, and useful collections',
    description: '',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Articles', href: '/article' },
          { label: 'Listings', href: '/listing' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Pages',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          
        ],
      },
    ],
    bottomNote: 'Built for polished discovery and repeat browsing.',
  },
  commonLabels: {
    readMore: 'Open page',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
