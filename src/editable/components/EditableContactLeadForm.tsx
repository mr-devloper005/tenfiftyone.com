'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your message has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.8rem] bg-white p-6 shadow-[0_18px_50px_rgba(26,50,99,0.08)] md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Your name" required />
        <Field name="email" type="email" label="Email address" placeholder="you@example.com" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="phone" label="Phone number" placeholder="Optional" />
        <Field name="subject" label="Subject" placeholder="What do you need help with?" />
      </div>
      <label className="grid gap-2 text-sm font-black text-[var(--slot4-page-text)]/80">
        Message
        <textarea name="message" required rows={6} placeholder="Tell us a little more..." className="rounded-[1rem] border border-[rgba(26,50,99,0.12)] bg-[var(--slot4-cream)] px-4 py-3 text-base font-medium text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`flex items-start gap-3 rounded-[1rem] px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[1rem] bg-[var(--slot4-accent)] px-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--slot4-dark-bg)] shadow-[0_18px_32px_rgba(255,197,112,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send message
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-black text-[var(--slot4-page-text)]/80">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="h-14 rounded-[1rem] border border-[rgba(26,50,99,0.12)] bg-[var(--slot4-cream)] px-4 text-base font-medium text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]" />
    </label>
  )
}
