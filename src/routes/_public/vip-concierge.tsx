import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/vip-concierge')({
  beforeLoad: () => {
    throw redirect({
      to: '/airport-greet-and-assist',
      replace: true,
    })
  },
})
