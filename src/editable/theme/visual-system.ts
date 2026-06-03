import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'calm magazine authority',
    fontDirection: 'serif headlines with quiet sans body',
    colors: {
      background: '#fbf7f0',
      foreground: '#1a3263',
      muted: '#547792',
      primary: '#1a3263',
      accent: '#ffc570',
      surface: '#fffdf9',
    },
    shape: 'soft editorial cards with refined spacing',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with elegant data labels',
    colors: {
      background: '#162c58',
      foreground: '#fff8ee',
      muted: '#d7c3a6',
      primary: '#ffc570',
      accent: '#efd2b0',
      surface: '#203b73',
    },
    shape: 'deep navy panels, warm metallic accents, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#f8f0e3',
      foreground: '#1a3263',
      muted: '#547792',
      primary: '#1a3263',
      accent: '#ffc570',
      surface: '#fffdf8',
    },
    shape: 'sharp edges, strong borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded serif with soft supporting type',
    colors: {
      background: '#f7f1e8',
      foreground: '#1a3263',
      muted: '#547792',
      primary: '#1a3263',
      accent: '#ffc570',
      surface: '#fffaf3',
    },
    shape: 'rounded cards, calm texture, airy sections',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'premium directory utility',
    fontDirection: 'luxury serif headlines with crisp sans metadata',
    colors: {
      background: '#fbf6ef',
      foreground: '#1a3263',
      muted: '#547792',
      primary: '#1a3263',
      accent: '#ffc570',
      surface: '#fffdf9',
    },
    shape: 'structured grids, polished chips, directory-first hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#f8efe0',
      foreground: '#1a3263',
      muted: '#547792',
      primary: '#1a3263',
      accent: '#ffc570',
      surface: '#fffbf4',
    },
    shape: 'framed modules, rounded tags, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#10264f',
      foreground: '#fff8ef',
      muted: '#cbd5e5',
      primary: '#ffc570',
      accent: '#efd2b0',
      surface: '#1b3568',
    },
    shape: 'dark cards, large media, polished overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'editorial-paper'
        : slot4BrandConfig.productKind === 'directory'
          ? 'tech-directory'
          : 'luxury-atelier',
  radius: {
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '2.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'font-serif text-5xl tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'font-serif text-3xl tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-black uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
    quiet: 'border border-[rgba(26,50,99,0.1)] bg-[rgba(26,50,99,0.03)]',
    dark: 'border border-white/10 bg-[#1a3263] shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[1440px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
