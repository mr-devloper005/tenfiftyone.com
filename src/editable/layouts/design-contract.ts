import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f1e8',
  '--slot4-page-text': '#1a3263',
  '--slot4-panel-bg': '#efe6d8',
  '--slot4-surface-bg': '#fffdf9',
  '--slot4-muted-text': '#547792',
  '--slot4-soft-muted-text': '#6e8099',
  '--slot4-accent': '#ffc570',
  '--slot4-accent-fill': '#ffc570',
  '--slot4-accent-soft': '#efd2b0',
  '--slot4-dark-bg': '#1a3263',
  '--slot4-dark-text': '#fffaf2',
  '--slot4-media-bg': '#eadfce',
  '--slot4-cream': '#fbf6ef',
  '--slot4-warm': '#f7efe3',
  '--slot4-lavender': '#edf3f9',
  '--slot4-gray': '#f4efe8',
  '--slot4-teal': '#3c8a92',
  '--slot4-body-gradient': 'radial-gradient(circle at top, rgba(239,210,176,0.22), transparent 28%), linear-gradient(180deg, #fbf7f0 0%, #f7f1e8 52%, #f2ece4 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[rgba(26,50,99,0.12)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_50px_rgba(26,50,99,0.08)]',
  shadowStrong: 'shadow-[0_30px_90px_rgba(26,50,99,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(26,50,99,0.04),rgba(26,50,99,0.74))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-18 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[220px] shrink-0 snap-start sm:w-[250px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[4.6rem]',
    sectionTitle: 'font-serif text-3xl tracking-[-0.04em] sm:text-4xl lg:text-[3.3rem]',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-[1rem] ${editablePalette.accentBg} px-8 py-3.5 text-sm font-black text-[var(--slot4-dark-bg)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(255,197,112,0.35)]`,
    secondary: `inline-flex items-center justify-center rounded-[1rem] border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-black ${editablePalette.surfaceText} transition hover:bg-[var(--slot4-page-text)] hover:text-white`,
    accent: `inline-flex items-center justify-center rounded-[1rem] ${editablePalette.darkBg} px-8 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(26,50,99,0.28)]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.5rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,50,99,0.14)]',
    fade: 'transition duration-300 hover:opacity-90',
  },
} as const

export const aiLayoutRules = [
  'Keep the palette anchored in navy, champagne, and warm cream for the premium directory mood.',
  'Preserve all route and data behavior; only redesign the editable presentation layer.',
  'Use mixed card sizes so featured, compact, horizontal, editorial, and image-first variants all appear across the site.',
  'Prefer large serif headings with clean sans-serif metadata to match the luxury editorial reference.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Render safely when image, summary, category, or business-like metadata is missing.',
] as const
