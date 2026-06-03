import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Editorial reading room',
    headline: 'Long-form reading arranged with a premium magazine rhythm.',
    description: 'Use this page for essays, guides, explainers, and story-led posts that deserve generous spacing and a quieter archive flow.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Thoughtful reading benefits from strong hierarchy, calm margins, and a steady supporting rail.',
    chips: ['Magazine pace', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Offer board',
    headline: 'Classified posts with clearer urgency and stronger action cues.',
    description: 'Classified content should scan quickly while still feeling polished enough to sit comfortably beside premium editorial sections.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize urgency, practical detail, and direct actions.',
    chips: ['Fast scan', 'Offers', 'Action ready'],
  },
  sbm: {
    eyebrow: 'Bookmark collection',
    headline: 'Curated social bookmarks with a richer directory-style presentation.',
    description: 'Bookmark pages should feel like elegant shelves of saved resources, standout links, and useful collections rather than a plain list.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Collections work best when metadata is light, discoverability is strong, and the saved page stays central.',
    chips: ['Collections', 'Useful links', 'Curated flow'],
  },
  profile: {
    eyebrow: 'Profile directory',
    headline: 'Profiles with identity, clarity, and stronger trust cues.',
    description: 'Profile pages should make creators, people, and brands easy to recognize before readers dive into supporting content.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Put identity and credibility first, then let supporting content extend the story.',
    chips: ['Identity first', 'Trust cues', 'Clear cards'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDFs and downloadable resources presented like a refined archive.',
    description: 'Document pages should feel like a useful library with clearer file context, polished cards, and quick access to the resource.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Resource browsing should feel organized, direct, and easy to revisit.',
    chips: ['Documents', 'Guides', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Directory collection',
    headline: 'Listings built for discovery, comparison, and clean scanning.',
    description: 'Listing pages should behave like a premium directory with better category cues, stronger cards, and direct contact paths.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Comparison works best when location, category, and actions are visible immediately.',
    chips: ['Directory', 'Compare', 'Quick actions'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image-led posts with a more dramatic browsing cadence.',
    description: 'Image pages should lead with visual impact while keeping captions, categories, and related content easy to follow.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the visual lead, then support it with concise context.',
    chips: ['Gallery', 'Image-first', 'Strong visuals'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
