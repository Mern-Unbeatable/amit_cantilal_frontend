import { PowerIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogout } from '@/features/auth/auth.hooks.ts'
import { Spinner } from '@/components/ui/spinner.tsx'
import { useAuthStore } from '@/stores/user.ts'
import { cn, getInitials } from '@/lib/utils.ts'

const AccountSwitcher = () => {
  const { mutate: logout, isPending } = useLogout()

  const user = useAuthStore((state) => state.user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={undefined} alt={user?.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(user ? user.name : '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 space-y-1 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem
          key={user?.email}
          className={cn(
            'p-0',
            user?.id === user?.id && 'bg-accent/50 border-l-primary border-l-2',
          )}
        >
          <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={undefined} alt={user?.name} />
              <AvatarFallback className="rounded-lg">
                {getInitials(user ? user.name : '')}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name}</span>
              <span className="truncate text-xs capitalize">{user?.role}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="px-4 py-2.5 text-xs text-destructive font-semibold cursor-pointer"
          disabled={isPending}
          onSelect={(e) => {
            e.preventDefault()
            logout()
          }}
        >
          {isPending ? (
            <Spinner className="size-4 text-primary" />
          ) : (
            <PowerIcon className="size-4 text-primary" />
          )}
          <span>{isPending ? 'Logging out...' : 'Logout'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountSwitcher
