import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, ShieldCheck, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="overflow-hidden bg-[linear-gradient(180deg,#21457b_0%,#1a3263_36%,#f7f0e6_36%,#fbf6ef_100%)]">
        <section className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="relative rounded-[2rem] bg-[linear-gradient(180deg,rgba(26,50,99,0.96)_0%,rgba(26,50,99,0.92)_100%)] p-6 text-white shadow-[0_24px_60px_rgba(14,30,66,0.22)] ring-1 ring-white/10 sm:p-8 lg:p-10">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)] ring-1 ring-white/10">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/84">{pagesContent.auth.login.description}</p>
            <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
              {[
                { icon: Bookmark, label: 'Saved links' },
                { icon: ShieldCheck, label: 'Member access' },
                { icon: Sparkles, label: 'Quick publishing' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-[1.4rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-3 text-sm font-black text-white/92">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-[rgba(255,253,249,0.96)] p-6 shadow-[0_24px_60px_rgba(26,50,99,0.14)] backdrop-blur sm:p-8">
            <div className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Welcome back
            </div>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[var(--slot4-page-text)]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              Access your account to continue browsing curated resources and manage new submissions from one place.
            </p>
            <EditableLocalLoginForm />
            <div className="mt-6 rounded-[1.4rem] bg-[var(--slot4-cream)] p-4 text-sm text-[var(--slot4-muted-text)]">
              New here? <Link href="/signup" className="font-black text-[var(--slot4-page-text)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
