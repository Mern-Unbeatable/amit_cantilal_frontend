import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useThemeStore } from '@/stores/theme.ts'

const ThemeSwitcher: React.FC = () => {
  const { theme, toggle } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="p-0 rounded-full"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  )
}

export default ThemeSwitcher
