'use client'

import { Bookmark, Mail, MapPin, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: Bookmark, title: 'Collection suggestions', body: 'Share a bookmark lane, resource shelf, or topic area you would like to see highlighted.' },
    { icon: Sparkles, title: 'Partnership ideas', body: 'Reach out about collaborations, sponsored collections, or a custom discovery surface.' },
    { icon: Mail, title: 'Support requests', body: 'Ask about publishing help, submission flow, or improving a page inside the archive.' },
    { icon: MapPin, title: 'Category requests', body: 'Need a new topic lane or better category grouping? We can shape the browsing structure around it.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-cream)] text-[var(--slot4-page-text)]">
        <section className="bg-[linear-gradient(180deg,#274f89_0%,#1a3263_100%)] text-white">
          <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="grid gap-4">
            {lanes.map((lane) => (
              <div key={lane.title} className="rounded-[1.8rem] border border-[rgba(26,50,99,0.12)] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)]">
                <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em]">{lane.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-5 font-serif text-4xl tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
