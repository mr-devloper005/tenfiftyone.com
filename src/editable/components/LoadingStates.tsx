import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-[1.4rem] bg-[var(--slot4-page-text)]/10', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8', className)} aria-live="polite" aria-busy="true">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">{label}</p>
      <PulseBlock className="mt-5 h-14 w-3/4 max-w-4xl" />
      <PulseBlock className="mt-4 h-6 w-2/3 max-w-2xl" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-5">
            <PulseBlock className="h-52 w-full" />
            <PulseBlock className="mt-5 h-5 w-4/5" />
            <PulseBlock className="mt-3 h-4 w-3/5" />
            <PulseBlock className="mt-6 h-11 w-36 rounded-[1rem]" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[2rem] border border-[rgba(26,50,99,0.12)] bg-white p-4">
          <PulseBlock className="h-48 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
          <PulseBlock className="mt-6 h-10 w-32 rounded-[1rem]" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]', className)} aria-live="polite" aria-busy="true">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">{label}</p>
        <PulseBlock className="mt-5 h-14 w-4/5" />
        <PulseBlock className="mt-5 h-4 w-full" />
        <PulseBlock className="mt-3 h-4 w-5/6" />
        <PulseBlock className="mt-3 h-4 w-2/3" />
      </div>
      <PulseBlock className="h-80 w-full rounded-[2rem]" />
    </div>
  )
}
