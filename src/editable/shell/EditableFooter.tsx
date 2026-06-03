'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = {
    '--editable-footer-bg': '#188a8f',
    '--editable-footer-text': '#fff8ef',
    '--editable-footer-soft': 'rgba(255,248,239,0.72)',
  } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="mt-auto bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            <span className="text-2xl font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--editable-footer-soft)]">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
        </div>

        
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/70">Pages</h3>
          <div className="mt-4 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
             
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/85 transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/70">Account</h3>
          <div className="mt-4 grid gap-3">
            {session ? (
              <>
                <Link href="/create" className="text-sm font-bold text-white/85 transition hover:text-white">Submit a new post</Link>
                <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/85 transition hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-white/85 transition hover:text-white">Login</Link>
                <Link href="/signup" className="text-sm font-bold text-white/85 transition hover:text-white">Create account</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/12 px-4 py-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/65">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
