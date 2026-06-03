import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, Download, ExternalLink, FileText, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

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

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => getEditableCategory(post) || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = {
    '--detail-bg': '#fbf6ef',
    '--detail-text': '#1a3263',
    '--detail-surface': '#fffdf9',
    '--detail-accent': '#ffc570',
    '--detail-soft': '#547792',
  } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        <DetailLayout task={task} post={post} related={related} comments={comments} />
      </main>
    </EditableSiteShell>
  )
}

function DetailLayout({ task, post, related, comments }: { task: TaskKey; post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const location = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url', 'link', 'fileUrl', 'pdfUrl', 'documentUrl'])
  const role = getField(post, ['role', 'designation', 'company'])
  const price = getField(post, ['price', 'amount', 'budget'])
  const mapSrc = mapSrcFor(post)

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <BackLink task={task} dark />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">{categoryOf(post, 'Featured')}</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[4.4rem]">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">{summaryText(post) || getEditableExcerpt(post, 180)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {location ? <MetaPill icon={MapPin} label={location} dark /> : null}
                {role ? <MetaPill icon={Tag} label={role} dark /> : null}
                {price ? <MetaPill icon={Tag} label={price} dark /> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
        <article className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-[var(--detail-surface)] p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <InfoCard label="Section" value={getTaskConfig(task)?.label || task} icon={Tag} />
            {location ? <InfoCard label="Location" value={location} icon={MapPin} /> : null}
            {phone ? <InfoCard label="Phone" value={phone} icon={Phone} /> : null}
            {email ? <InfoCard label="Email" value={email} icon={Mail} /> : null}
            {!location && !phone && !email ? <InfoCard label="Category" value={categoryOf(post, 'Featured')} icon={Tag} /> : null}
          </div>

          <BodyContent post={post} />

          {task === 'article' ? <EditableComments slug={post.slug} comments={comments} /> : null}
        </article>

        <aside className="space-y-5">
          <ActionPanel task={task} website={website} phone={phone} email={email} />
          {mapSrc ? <MapBox src={mapSrc} label={location || post.title} /> : null}
          <RelatedPanel task={task} related={related} />
        </aside>
      </section>
    </>
  )
}

function BackLink({ task, dark = false }: { task: TaskKey; dark?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className={`inline-flex items-center gap-2 rounded-[1rem] px-4 py-3 text-sm font-black ${dark ? 'bg-white/10 text-white ring-1 ring-white/15' : 'border border-[rgba(26,50,99,0.12)] bg-white text-[var(--detail-text)]'}`}>
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function MetaPill({ icon: Icon, label, dark = false }: { icon: typeof MapPin; label: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${dark ? 'bg-white/10 text-white ring-1 ring-white/10' : 'bg-[var(--detail-bg)] text-[var(--detail-text)]'}`}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </span>
  )
}

function InfoCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof MapPin }) {
  return (
    <div className="rounded-[1.3rem] bg-[var(--detail-bg)] p-4">
      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--detail-soft)]">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <p className="mt-2 break-words text-sm font-bold leading-6 text-[var(--detail-text)]">{value}</p>
    </div>
  )
}

function BodyContent({ post }: { post: SitePost }) {
  return <div className="article-content mt-8 max-w-none text-lg leading-9" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function ActionPanel({ task, website, phone, email }: { task: TaskKey; website?: string; phone?: string; email?: string }) {
  const icon = task === 'listing' ? Building2 : task === 'image' ? Camera : task === 'profile' ? UserRound : task === 'sbm' ? Bookmark : task === 'pdf' ? Download : FileText
  const Icon = icon
  return (
    <div>
      
    </div>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white shadow-[0_18px_50px_rgba(26,50,99,0.08)]">
      <div className="flex items-center gap-2 p-4 text-sm font-black text-[var(--detail-text)]"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-72 w-full border-0" />
    </div>
  )
}

function RelatedPanel({ task, related }: { task: TaskKey; related: SitePost[] }) {
  const taskConfig = getTaskConfig(task)
  if (!related.length) return null
  return (
    <div className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--detail-text)]">More like this</h2>
        <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] text-[var(--detail-soft)]">View all</Link>
      </div>
      <div className="mt-5 grid gap-3">
        {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
      </div>
    </div>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  return (
    <Link href={buildPostUrl(task, post.slug)} className="rounded-[1.3rem] bg-[var(--detail-bg)] p-4 transition hover:-translate-y-0.5">
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-base font-black leading-tight tracking-[-0.03em] text-[var(--detail-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--detail-soft)]">{getEditableExcerpt(post, 80)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] bg-[var(--detail-bg)] p-6">
      <div className="flex items-center gap-2 font-serif text-3xl tracking-[-0.04em] text-[var(--detail-text)]"><MessageCircle className="h-6 w-6" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-[1.3rem] bg-white p-4">
            <p className="text-sm font-black text-[var(--detail-text)]">{comment.name}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--detail-soft)]">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[var(--detail-soft)]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
