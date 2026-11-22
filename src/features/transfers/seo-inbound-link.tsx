import { Link } from '@tanstack/react-router'

interface SeoInboundLinkProps {
  to: string
  children: string
  className?: string
}

const DEFAULT_CLASS =
  'font-medium text-[#C9A84C] underline underline-offset-4 hover:text-[#E2C97E] transition-colors'

/** Contextual SEO internal link with exact worksheet anchor text. */
export function SeoInboundLink({
  to,
  children,
  className = DEFAULT_CLASS,
}: SeoInboundLinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

interface SeoInboundNoteProps {
  to: string
  anchorText: string
  before?: string
  after?: string
  className?: string
}

export function SeoInboundNote({
  to,
  anchorText,
  before = 'Also available: ',
  after = '.',
  className = 'text-sm md:text-base text-[#9A9182] font-light leading-relaxed',
}: SeoInboundNoteProps) {
  return (
    <p className={className}>
      {before}
      <SeoInboundLink to={to}>{anchorText}</SeoInboundLink>
      {after}
    </p>
  )
}
