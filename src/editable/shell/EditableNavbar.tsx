'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': '#fffdf9',
    '--editable-nav-text': '#000000',
    '--editable-nav-active': preset.colors.primary,
    '--editable-nav-active-text': '#fffaf2',
    '--editable-cta-bg': '#ffc570',
    '--editable-cta-text': '#1a3263',
    '--editable-search-bg': '#ffffff',
    '--editable-border': 'rgba(26,50,99,0.12)',
    '--editable-container': '1440px',
  } as CSSProperties

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/96 text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[86px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          <span className="hidden sm:block">
            <span className="block text-2xl font-black tracking-[-0.04em] text-black">{SITE_CONFIG.name}</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          {navItems.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition ${active ? 'text-black' : 'text-[var(--editable-nav-text)] hover:text-[var(--slot4-accent)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/contact" className="text-sm font-bold hover:text-[var(--slot4-accent)]">Contact</Link>
        </div>

        <form action="/search" className="hidden min-w-0 flex-1 justify-center xl:flex">
          <label className="relative flex w-full max-w-lg items-center rounded-[1rem] border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search saved links and topics" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-[var(--slot4-muted-text)]/60" />
          </label>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden rounded-[1rem] bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex sm:items-center sm:gap-2">
                <PlusCircle className="h-4 w-4" /> Submit
              </Link>
              <button type="button" onClick={logout} className="hidden rounded-[1rem] px-4 py-2.5 text-sm font-black text-[var(--editable-nav-text)] hover:bg-[var(--slot4-page-text)]/5 sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-[1rem] px-4 py-2.5 text-sm font-black hover:bg-[var(--slot4-page-text)]/5 sm:inline-flex sm:items-center sm:gap-2">
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="hidden rounded-[1rem] bg-[var(--editable-nav-active)] px-4 py-2.5 text-sm font-black text-[var(--editable-nav-active-text)] shadow-sm sm:inline-flex sm:items-center sm:gap-2">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-[1rem] border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-[1rem] border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2.5">
            <Search className="mt-1 h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search the collection" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Submit', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-[1rem] border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-[1rem] border border-[var(--editable-border)] bg-white px-4 py-3 text-left text-sm font-black">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
