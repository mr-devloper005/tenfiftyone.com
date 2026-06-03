import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Layers3, PenSquare } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,197,112,0.18),transparent_20%),linear-gradient(180deg,#fbf6ef_0%,#fffaf4_100%)] text-[var(--slot4-page-text)]">
        <section className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] p-6 text-white shadow-[0_24px_60px_rgba(26,50,99,0.18)] sm:p-8">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)] ring-1 ring-white/10">
              Start your account
            </div>
            <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em]">{pagesContent.auth.signup.formTitle}</h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/74">
              Create your login to unlock submissions, save your member details, and keep publishing through the same polished workflow.
            </p>
            <EditableLocalSignupForm />
            <div className="mt-6 rounded-[1.4rem] bg-white/10 p-4 text-sm text-white/76 ring-1 ring-white/10">
              Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/72 p-6 shadow-[0_20px_50px_rgba(26,50,99,0.08)] ring-1 ring-[rgba(26,50,99,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
            <p className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-black">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                { icon: PenSquare, title: 'Submit faster', body: 'Open the content studio and start drafting new finds in minutes.' },
                { icon: Layers3, title: 'Stay organized', body: 'Keep your member actions tied to one clean, familiar account space.' },
                { icon: CheckCircle2, title: 'Join smoothly', body: 'Simple local signup, fast access, and a UI that matches the rest of the site.' },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-[1.6rem] border border-[rgba(26,50,99,0.1)] bg-white/80 p-5 shadow-[0_16px_40px_rgba(26,50,99,0.06)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[var(--slot4-page-text)]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
