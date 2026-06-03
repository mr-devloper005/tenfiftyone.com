import Link from 'next/link'
import { ArrowRight, Bookmark, ExternalLink, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

type CategoryBucket = {
  name: string
  count: number
  icon: string
}

const categoryIcons = ['🏷️', '✦', '◈', '◆', '✳', '⌘', '✺', '◉']

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function uniqueCategories(posts: SitePost[]): CategoryBucket[] {
  const map = new Map<string, number>()
  posts.forEach((post) => {
    const name = getEditableCategory(post) || 'Featured'
    map.set(name, (map.get(name) || 0) + 1)
  })
  return Array.from(map.entries())
    .slice(0, 8)
    .map(([name, count], index) => ({ name, count, icon: categoryIcons[index % categoryIcons.length] }))
}

function SearchHeroCard({ primaryRoute }: { primaryRoute: string }) {
  return (
    <form action={primaryRoute} className="mx-auto mt-10 max-w-3xl rounded-[1.35rem] border border-white/20 bg-white p-2 shadow-[0_20px_40px_rgba(6,16,42,0.16)]">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] bg-[var(--slot4-cream)] text-[var(--slot4-page-text)]">
          <Search className="h-5 w-5" />
        </div>
        <input
          name="category"
          placeholder={pagesContent.home.hero.searchPlaceholder}
          className="h-14 min-w-0 flex-1 rounded-[1rem] border border-transparent bg-transparent px-4 text-sm font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]/70"
        />
        <button className="inline-flex h-14 items-center justify-center rounded-[1rem] bg-[var(--slot4-accent)] px-8 text-sm font-black text-[var(--slot4-dark-bg)] transition hover:-translate-y-0.5">
          Search <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

function FeaturedListingCard({ post, href, style }: { post: SitePost; href: string; style: 'feature' | 'compact' | 'horizontal' | 'editorial' | 'image-first' }) {
  const category = getEditableCategory(post)
  const excerpt = getEditableExcerpt(post, style === 'compact' ? 90 : 140)
  const image = getEditablePostImage(post)

  if (style === 'feature') {
    return (
      <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-accent)] px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-dark-bg)]">
            Premium
          </span>
        </div>
        <div className="p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-teal)]">{category}</p>
          <h3 className="mt-3 font-serif text-[2rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">View <ArrowRight className="h-4 w-4" /></span>
        </div>
      </Link>
    )
  }

  if (style === 'horizontal') {
    return (
      <Link href={href} className="group grid overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[260px_minmax(0,1fr)]">
        <div className="relative min-h-[220px] overflow-hidden">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-teal)]">{category}</p>
          <h3 className="mt-3 font-serif text-[1.8rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Open <ArrowRight className="h-4 w-4" /></span>
        </div>
      </Link>
    )
  }

  if (style === 'editorial') {
    return (
      <Link href={href} className="group rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{category}</p>
        <h3 className="mt-3 font-serif text-[1.95rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Read more <ArrowRight className="h-4 w-4" /></span>
      </Link>
    )
  }

  if (style === 'image-first') {
    return (
      <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(26,50,99,0.8)_100%)]" />
          <p className="absolute left-5 top-5 rounded-full bg-[var(--slot4-accent)] px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-dark-bg)]">
            Spotlight
          </p>
          <h3 className="absolute bottom-5 left-5 right-5 font-serif text-[1.75rem] leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
        </div>
        <div className="p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-teal)]">{category}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-5 shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
          {category}
        </span>
        <Bookmark className="h-4 w-4 text-[var(--slot4-muted-text)]" />
      </div>
      <h3 className="mt-5 line-clamp-3 font-serif text-[1.55rem] leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Visit <ExternalLink className="h-4 w-4" /></span>
    </Link>
  )
}

function StatStrip({ posts, timeSections }: { posts: SitePost[]; timeSections: HomeTimeSection[] }) {
  const categories = uniqueCategories(posts)
  const totalCollections = timeSections.length || Math.max(4, categories.length)
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-center text-white">
      {[
        { value: `${Math.max(posts.length, 6)}+`, label: 'saved pages' },
        { value: `${Math.max(categories.length, 4)}`, label: 'categories' },
        { value: `${Math.max(totalCollections * 2, 10)}K+`, label: 'monthly views' },
        { value: '4.8★', label: 'reader rating' },
      ].map((item) => (
        <div key={item.label}>
          <p className="font-serif text-3xl">{item.value}</p>
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/75">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-[var(--slot4-accent)]/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
        <h1 className="mx-auto mt-6 max-w-5xl font-serif text-5xl leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]">
          {heroTitle.replace('saved links,', '')}{' '}
          <span className="text-[var(--slot4-accent)]">saved links</span>, collections, and standout finds.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
          {pagesContent.home.hero.description}
        </p>
        <SearchHeroCard primaryRoute={primaryRoute} />
        <StatStrip posts={posts} timeSections={timeSections} />
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const categories = uniqueCategories(posts)
  if (!categories.length) return null
  return (
    <section className={`${pal.creamBg}`}>
      <div className="mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-black">
          Browse by category
        </span>
        <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">Find what you need</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">
          Explore collections, bookmark lanes, and saved topics arranged for fast browsing.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((item) => (
            <Link key={item.name} href={`${primaryRoute}?category=${encodeURIComponent(item.name.toLowerCase())}`} className="rounded-[1.6rem] border border-[rgba(26,50,99,0.12)] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(26,50,99,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,50,99,0.12)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-2xl">{item.icon}</div>
              <h3 className="mt-5 text-lg font-black text-[var(--slot4-page-text)]">{item.name}</h3>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{item.count} listing{item.count === 1 ? '' : 's'}</p>
            </Link>
          ))}
        </div>
        <Link href={primaryRoute} className="mt-10 inline-flex items-center justify-center rounded-[1rem] bg-[var(--slot4-dark-bg)] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">
          Browse all categories <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featurePosts = posts.slice(0, 6)
  if (!featurePosts.length) return null

  const styles: Array<'feature' | 'horizontal' | 'image-first' | 'compact' | 'editorial' | 'compact'> = ['feature', 'horizontal', 'image-first', 'compact', 'editorial', 'compact']

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#d9f1f2] px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#188a8f]">
            Featured listings
          </span>
          <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">Top-rated discoveries</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">
            Hand-picked posts, useful saves, and standout pages surfaced through a richer directory layout.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featurePosts.map((post, index) => (
            <FeaturedListingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} style={styles[index] || 'compact'} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const supportPosts = (timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(0, 6)
  return (
    <>
      <section className={`${pal.creamBg}`}>
        <div className="mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex rounded-full bg-[#e6edfb] px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-page-text)]">
            How it works
          </span>
          <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">Save, sort, and discover in minutes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">
            A simple browsing rhythm designed for people who want premium presentation without losing the speed of social bookmarking.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { step: '1', title: 'Pick a collection', body: 'Start with a category, keyword, or featured card and move straight into the part of the archive that fits your mood.' },
              { step: '2', title: 'Explore the details', body: 'Open polished cards, scan summaries, and jump into the saved page that looks most useful.' },
              { step: '3', title: 'Keep the trail going', body: 'Move through related posts, topic lanes, and archive sections without losing the sense of place.' },
            ].map((item) => (
              <div key={item.step} className="rounded-[1.8rem] border border-[rgba(26,50,99,0.12)] bg-white p-8 shadow-[0_16px_40px_rgba(26,50,99,0.05)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-2xl font-black text-white">{item.step}</div>
                <h3 className="mt-6 font-serif text-3xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.body}</p>
              </div>
            ))}
          </div>
          <Link href={primaryRoute} className="mt-10 inline-flex items-center justify-center rounded-[1rem] bg-[var(--slot4-accent)] px-8 py-4 text-sm font-black text-[var(--slot4-dark-bg)] transition hover:-translate-y-0.5">
            Open {taskLabel(primaryTask).toLowerCase()} now
          </Link>
        </div>
      </section>

      <section className="bg-[#188a8f] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16">
          {[
            { value: `${Math.max(posts.length, 6)}+`, label: 'active links' },
            { value: '98%', label: 'repeat discovery' },
            { value: '4.8★', label: 'average rating' },
            { value: '∞', label: 'bookmark potential' },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-serif text-5xl">{item.value}</p>
              <p className="mt-3 text-sm font-bold text-white/85">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#d9f1f2] px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#188a8f]">
              Community picks
            </span>
            <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">What readers keep opening</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">
              A few spotlight cards from the latest stream, arranged like editorial endorsements without breaking the live feed.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {supportPosts.slice(0, 3).map((post, index) => (
              <div key={post.id || post.slug} className="rounded-[1.8rem] border border-[rgba(26,50,99,0.12)] bg-white p-7 shadow-[0_16px_40px_rgba(26,50,99,0.05)]">
                <div className="flex gap-1 text-[var(--slot4-accent)]">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-5 text-lg leading-9 text-[var(--slot4-page-text)]">
                  “{getEditableExcerpt(post, 150) || 'A bookmark worth revisiting for its clarity, usefulness, and easy path into related discoveries.'}”
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-page-text)]">
                    {String(index + 1)}
                  </div>
                  <div>
                    <p className="font-black text-[var(--slot4-page-text)]">{getEditableCategory(post)}</p>
                    <Link href={postHref(primaryTask, post, primaryRoute)} className="text-sm font-semibold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">
                      Open “{post.title}”
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className={`${pal.creamBg} border-t border-[rgba(26,50,99,0.08)]`}>
      <div className="mx-auto max-w-[1100px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
          Keep browsing
        </span>
        <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">
          Where bookmark lovers can keep finding the next useful page.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">
          Continue through the archive, search by topic, or open the latest saved resources through the premium discovery flow.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={pagesContent.home.cta.primaryCta.href} className={dc.button.primary}>{pagesContent.home.cta.primaryCta.label}</Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
        </div>
      </div>
    </section>
  )
}
