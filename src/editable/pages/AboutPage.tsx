import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-cream)] px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2.5rem] bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] p-8 text-white shadow-[0_24px_70px_rgba(26,50,99,0.18)] lg:p-12">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 font-serif text-5xl tracking-[-0.05em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-white/78">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)]">
                <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
