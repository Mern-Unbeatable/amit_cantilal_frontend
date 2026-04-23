import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

type WelcomeBannerProps = {
  name?: string
  sessionsRemaining?: number
  nextSessionDate?: string
  className?: string
}

const WelcomeBanner = ({
  name,
  sessionsRemaining,
  nextSessionDate,
  className,
}: WelcomeBannerProps) => {

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const firstName = name && name.split(' ')[0]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-[#0E2A46] px-6 py-5 md:px-8 md:py-6',
        className,
      )}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-orange-500/10" />
      <div className="pointer-events-none absolute -bottom-8 -right-4 size-32 rounded-full bg-orange-500/6" />
      <div className="pointer-events-none absolute top-4 right-40 size-3 rounded-full bg-orange-400/30" />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left — greeting */}
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
            <Icon
              icon="material-symbols:waving-hand"
              className="size-6 text-orange-400"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white/50">{greeting}</p>
            <h2 className="text-xl font-bold text-white leading-tight">
              Welcome back, {firstName}!
            </h2>
          </div>
        </div>

        {/* Right — quick info pills */}
        <div className="flex flex-wrap gap-2">
          {sessionsRemaining !== undefined && (
            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
              <Icon
                icon="material-symbols:calendar-month"
                className="size-4 text-orange-400"
              />
              <span className="text-xs font-medium text-white/80">
                <span className="text-orange-400 font-semibold">
                  {sessionsRemaining}
                </span>{' '}
                session{sessionsRemaining !== 1 ? 's' : ''} remaining
              </span>
            </div>
          )}
          {nextSessionDate ? (
            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
              <Icon
                icon="material-symbols:schedule"
                className="size-4 text-orange-400"
              />
              <span className="text-xs font-medium text-white/80">
                Next:{' '}
                <span className="text-orange-400 font-semibold">
                  {nextSessionDate}
                </span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
              <Icon
                icon="material-symbols:schedule"
                className="size-4 text-white/30"
              />
              <span className="text-xs font-medium text-white/40">
                No upcoming session
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
