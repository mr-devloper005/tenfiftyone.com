import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium bookmarks, collections, and discoverable links',
      description: 'Explore curated bookmark collections, featured finds, and polished discovery pages through a premium social bookmarking experience.',
      openGraphTitle: 'Premium bookmarks, collections, and discoverable links',
      openGraphDescription: 'Discover curated bookmark collections, featured finds, and elegant discovery pages in one premium browsing experience.',
      keywords: ['social bookmarking', 'saved links', 'curated resources', 'bookmark collections'],
    },
    hero: {
      badge: '',
      title: ['Discover the finest saved links,', 'collections, and standout finds.'],
      description: 'A polished social bookmarking home built for readers who like clean browsing, strong categories, and memorable picks collected in one place.',
      primaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Explore categories', href: '/search' },
      searchPlaceholder: 'Search bookmarks, collections, guides, and topics',
      focusLabel: 'Featured',
      featureCardBadge: 'editor pick',
      featureCardTitle: 'Freshly saved pages rise to the top through elegant directory-style discovery.',
      featureCardDescription: 'The homepage stays connected to live post data while presenting it through a warmer, more premium visual rhythm.',
    },
    intro: {
      badge: 'Why it works',
      title: 'Built for people who love saving useful pages and finding the next great link fast.',
      paragraphs: [
        'The experience blends bookmark collections, category browsing, and feature-rich post cards into a layout that feels more like a premium discovery directory than a generic feed.',
        'Visitors can move between curated highlights, image-led spotlights, and compact saved resources without losing context or dealing with clutter.',
        'The result is a calmer way to browse new finds, revisit trusted pages, and discover related content across the site.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Premium social bookmarking layout with strong category cues.',
        'Mixed card styles for featured, compact, editorial, and image-first content.',
        'Search-first browsing that still feels polished on mobile.',
        'Consistent discovery flow across homepage, archive, detail, and utility pages.',
      ],
      primaryLink: { label: 'Browse saved links', href: '/sbm' },
      secondaryLink: { label: 'Search the archive', href: '/search' },
    },
    cta: {
      badge: 'Keep exploring',
      title: 'Turn quick saves into a browsing experience worth coming back to.',
      description: 'Move from curated highlights to detailed pages, topic lanes, and archive views through one consistent premium interface.',
      primaryCta: { label: 'Open bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the collection',
    title: 'A premium discovery home for people who save the good stuff.',
    description: `${slot4BrandConfig.siteName} brings social bookmarking, visual discovery, and structured browsing together in one polished destination.`,
    paragraphs: [
      'The site is designed to make saved resources feel elevated, browsable, and easy to revisit.',
      'Instead of presenting links as a plain list, the experience gives collections, highlights, and detail pages a stronger sense of place and rhythm.',
    ],
    values: [
      {
        title: 'Curated discovery',
        description: 'Useful pages should feel hand-selected and easy to explore, not buried inside a flat feed.',
      },
      {
        title: 'Premium browsing',
        description: 'Large headings, elegant spacing, and mixed card layouts help every section feel more intentional.',
      },
      {
        title: 'Clear navigation',
        description: 'Whether someone arrives through search or category browsing, the path to the next useful page stays simple.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach out about collections, submissions, partnerships, or a new discovery lane.',
    description: 'Share what you want to publish, curate, or improve, and we will route the request through the right part of the site.',
    formTitle: 'Send a note',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the collection',
      title: 'Find saved links, standout posts, and useful topics faster.',
      description: 'Use keywords, category hints, and content types to discover pages from every active section of the site.',
      placeholder: 'Search by title, topic, category, or keyword',
    },
    resultsTitle: 'Fresh results across the archive',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Member access',
      title: 'Login to open the submission lounge.',
      description: 'Use your account to save new posts, bookmark entries, and supporting content into the publishing workspace.',
    },
    hero: {
      badge: 'Submission studio',
      title: 'Create new entries for every active section.',
      description: 'Choose the content type, add the essentials, and prepare a polished post with summary, images, links, and body content.',
    },
    formTitle: 'Entry details',
    submitLabel: 'Save submission',
    successTitle: 'Your submission draft has been saved.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member login',
      title: 'Return to your saved publishing space.',
      description: 'Login to continue browsing, managing submissions, and publishing new entries from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create an account first, then sign in.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and start adding new finds.',
      description: 'Create an account to access the submission studio, save your details, and publish new content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
