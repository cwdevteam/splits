import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const ComponentLayout = ({
  theme = 'system',
  children,
}: {
  theme: 'light' | 'dark' | 'system'
  children: React.ReactNode
}): JSX.Element => {
  const [userPrefersDark, setUserPrefersDark] = useState(false)

  useEffect(() => {
    // Check if `window` is available (i.e., code is running in the browser)
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      setUserPrefersDark(mq.matches)

      const handleThemeChange = (evt: MediaQueryListEvent) => {
        setUserPrefersDark(evt.matches)
      }

      mq.addEventListener('change', handleThemeChange)

      return () => mq.removeEventListener('change', handleThemeChange)
    }
  }, [])

  const themeClass = {
    light: '',
    dark: 'dark',
    system: userPrefersDark ? 'dark' : '',
  }

  return (
    <div className={twMerge(themeClass[theme], 'w-full')}>
      <div className="grid min-h-72 w-full divide-y divide-gray-200 rounded border border-gray-200 bg-white text-left font-sans text-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-black dark:text-white">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default ComponentLayout
