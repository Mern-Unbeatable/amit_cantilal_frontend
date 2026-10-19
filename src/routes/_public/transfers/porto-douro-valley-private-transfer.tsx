import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public/transfers/porto-douro-valley-private-transfer',
)({
  beforeLoad: () => {
    throw redirect({
      to: '/transfers/lisbon-douro-valley-private-transfer',
      replace: true,
    })
  },
})
