import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Bookmark, BriefcaseBusiness, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { buildPostUrl, fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; promise: string; badge: string }> = {
  article: { icon: FileText, promise: 'Reading-first cards with room for headlines and summaries.', badge: 'Article' },
  listing: { icon: BriefcaseBusiness, promise: 'Directory cards surface identity, location, and quick actions.', badge: 'Listing' },
  classified: { icon: Megaphone, promise: 'Offer cards prioritize price, location, and fast scanning.', badge: 'Classified' },
  image: { icon: Camera, promise: 'Gallery-first browsing keeps visuals at the center.', badge: 'Visual' },
  sbm: { icon: Bookmark, promise: 'Curated bookmark cards stay easy to scan and revisit.', badge: 'Bookmark' },
  pdf: { icon: Download, promise: 'Document cards make files feel like part of a premium library.', badge: 'PDF' },
  profile: { icon: UserRound, promise: 'Profile cards lead with identity and supporting context.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': '#fbf6ef',
    '--archive-text': '#1a3263',
    '--archive-surface': '#fffdf9',
    '--archive-accent': '#ffc570',
    '--archive-soft': '#547792',
  } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] text-white">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">
                <Icon className="h-4 w-4" /> {voice.eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">{voice.headline}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{voice.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/82">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <form action={basePath} className="self-end rounded-[2rem] bg-white p-5 text-[var(--archive-text)] shadow-[0_20px_50px_rgba(12,21,48,0.18)]">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-soft)]">
                <Filter className="h-4 w-4" /> {voice.filterLabel}
              </div>
              <select name="category" defaultValue={category} className="mt-4 h-14 w-full rounded-[1rem] border border-[rgba(26,50,99,0.12)] bg-white px-4 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-14 w-full rounded-[1rem] bg-[var(--archive-accent)] text-sm font-black text-[var(--archive-text)] transition hover:-translate-y-0.5">Apply filters</button>
              <p className="mt-3 text-sm font-semibold text-[var(--archive-soft)]">Showing: {categoryLabel}</p>
              <p className="mt-5 rounded-[1rem] bg-[var(--archive-bg)] px-4 py-4 text-sm leading-7 text-[var(--archive-soft)]">{deck.promise}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[rgba(26,50,99,0.18)] bg-white/80 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--archive-soft)]" />
              <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">No posts found</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--archive-soft)]">Try another category or check back after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-[1rem] border border-[rgba(26,50,99,0.12)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-[1rem] bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-[1rem] border border-[rgba(26,50,99,0.12)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const summary = getEditableExcerpt(post, 160)
  const location = getField(post, ['location', 'address', 'city'])
  const price = getField(post, ['price', 'amount', 'budget'])
  const website = getField(post, ['website', 'url', 'link'])
  const role = getField(post, ['role', 'designation', 'company'])

  if (task === 'sbm') {
    return (
      <Link href={href} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--archive-accent)] px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-text)]">{category}</span>
          <Bookmark className="h-5 w-5 text-[var(--archive-soft)]" />
        </div>
        <h2 className="mt-8 font-serif text-[2rem] leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--archive-soft)]">{summary}</p>
        {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-soft)]">{website.replace(/^https?:\/\//, '')}</p> : null}
      </Link>
    )
  }

  if (task === 'listing' || task === 'profile') {
    return (
      <Link href={href} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-5 shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.3rem] bg-[var(--archive-bg)]">
            {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : task === 'listing' ? <BriefcaseBusiness className="h-8 w-8 text-[var(--archive-soft)]" /> : <UserRound className="h-8 w-8 text-[var(--archive-soft)]" />}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#188a8f]">{category}</p>
            <h2 className="mt-2 line-clamp-2 font-serif text-[1.7rem] leading-tight tracking-[-0.04em]">{post.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--archive-soft)]">{summary}</p>
            {location || role ? <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-soft)]">{location || role}</p> : null}
          </div>
        </div>
      </Link>
    )
  }

  if (task === 'classified') {
    return (
      <Link href={href} className="overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="bg-[var(--archive-text)] p-6 text-white">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">{category}</p>
          <h2 className="mt-4 font-serif text-[2.4rem] leading-none">{price || 'Open offer'}</h2>
          <p className="mt-3 text-sm text-white/80">{location || 'View listing details'}</p>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-[1.7rem] leading-tight tracking-[-0.04em] text-[var(--archive-text)]">{post.title}</h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--archive-soft)]">{summary}</p>
        </div>
      </Link>
    )
  }

  if (task === 'image') {
    return (
      <Link href={href} className={`overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)] ${index % 5 === 0 ? 'md:col-span-2' : ''}`}>
        <div className={index % 5 === 0 ? 'aspect-[16/7]' : 'aspect-[4/3]'}>
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--archive-text)]"><ImageIcon className="h-3 w-3" /> {category}</div>
          <h2 className="mt-4 line-clamp-3 font-serif text-[1.7rem] leading-tight tracking-[-0.04em] text-[var(--archive-text)]">{post.title}</h2>
        </div>
      </Link>
    )
  }

  if (task === 'pdf') {
    return (
      <Link href={href} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-[1.4rem] bg-[var(--archive-text)] p-5 text-white"><Download className="h-7 w-7" /></div>
          <span className="rounded-full bg-[var(--archive-accent)] px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-text)]">{category}</span>
        </div>
        <h2 className="mt-8 font-serif text-[1.8rem] leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--archive-soft)]">{summary}</p>
      </Link>
    )
  }

  return (
    <Link href={href} className={`overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(26,50,99,0.14)] ${index % 4 === 0 ? 'md:col-span-2' : ''}`}>
      <div className={index % 4 === 0 ? 'grid sm:grid-cols-[280px_minmax(0,1fr)]' : ''}>
        <div className={`relative overflow-hidden ${index % 4 === 0 ? 'min-h-[240px]' : 'aspect-[4/3]'}`}>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#188a8f]">{category}</p>
          <h2 className="mt-3 font-serif text-[1.9rem] leading-tight tracking-[-0.04em] text-[var(--archive-text)]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--archive-soft)]">{summary}</p>
          {location ? <p className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-soft)]"><MapPin className="h-3.5 w-3.5" /> {location}</p> : null}
        </div>
      </div>
    </Link>
  )
}
