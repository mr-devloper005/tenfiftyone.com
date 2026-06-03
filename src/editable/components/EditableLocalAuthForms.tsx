'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'

const USERS_KEY = 'slot4:local-auth-users'
const SESSION_KEY = 'slot4:local-auth-session'

type LocalUser = {
  name: string
  email: string
  password: string
  createdAt: string
}

const readUsers = (): LocalUser[] => {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveUsers = (users: LocalUser[]) => window.localStorage.setItem(USERS_KEY, JSON.stringify(users))

const saveSession = (user: Pick<LocalUser, 'name' | 'email'>) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email, loggedInAt: new Date().toISOString() }))
  window.dispatchEvent(new Event('slot4-auth-change'))
}

const inputWrapClass = 'group flex items-center gap-3 rounded-[1.2rem] border border-[rgba(26,50,99,0.12)] bg-[#fffaf4] px-4 transition focus-within:border-[var(--slot4-accent)] focus-within:bg-white focus-within:shadow-[0_12px_28px_rgba(26,50,99,0.08)]'
const inputClass = 'h-14 w-full bg-transparent text-base font-bold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]/48'
const buttonClass = 'inline-flex h-14 items-center justify-center gap-2 rounded-[1.1rem] bg-[var(--slot4-accent)] px-6 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-dark-bg)] shadow-[0_18px_32px_rgba(255,197,112,0.28)] transition hover:-translate-y-0.5 disabled:opacity-60'
const noteClass = 'rounded-[1.2rem] border px-4 py-3 text-sm font-bold'

function AuthField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon: typeof Mail
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{label}</span>
      <span className={inputWrapClass}>
        <Icon className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)] transition group-focus-within:text-[var(--slot4-page-text)]" />
        <input className={inputClass} type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} required />
      </span>
    </label>
  )
}

export function EditableLocalLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find((item) => item.email.toLowerCase() === normalizedEmail)
    if (!user || user.password !== password) {
      setStatus('error')
      setMessage(pagesContent.auth.login.noAccount)
      return
    }
    saveSession(user)
    setStatus('success')
    setMessage(pagesContent.auth.login.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <AuthField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={Mail} />
      <AuthField label="Password" type="password" placeholder="Enter your password" value={password} onChange={setPassword} icon={LockKeyhole} />
      {message ? <p className={`${noteClass} ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.login.submitLabel} <ArrowRight className="h-4 w-4" /></button>
    </form>
  )
}

export function EditableLocalSignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    if (password.length < 4) {
      setStatus('error')
      setMessage(pagesContent.auth.signup.passwordShort)
      return
    }
    const users = readUsers()
    const nextUser: LocalUser = {
      name: normalizedName || normalizedEmail.split('@')[0] || 'Member',
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }
    saveUsers([nextUser, ...users.filter((item) => item.email.toLowerCase() !== normalizedEmail)])
    saveSession(nextUser)
    setStatus('success')
    setMessage(pagesContent.auth.signup.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <AuthField label="Full name" placeholder="Your name" value={name} onChange={setName} icon={UserRound} />
      <AuthField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={Mail} />
      <AuthField label="Password" type="password" placeholder="Use at least 4 characters" value={password} onChange={setPassword} icon={LockKeyhole} />
      {message ? <p className={`${noteClass} ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.signup.submitLabel} <ArrowRight className="h-4 w-4" /></button>
    </form>
  )
}

export function useEditableLocalAuthSession() {
  const [session, setSession] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const load = () => {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null')
        setSession(parsed && typeof parsed.email === 'string' ? parsed : null)
      } catch {
        setSession(null)
      }
    }
    load()
    window.addEventListener('slot4-auth-change', load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener('slot4-auth-change', load)
      window.removeEventListener('storage', load)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    window.dispatchEvent(new Event('slot4-auth-change'))
    setSession(null)
  }

  return { session, logout }
}
