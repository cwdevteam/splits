import { useEffect, useState } from 'react'
import { CHAIN_INFO } from '../../constants/chains'

const ComponentLayout = ({
  body,
  error,
  chainId,
  width = 'md',
  theme = 'system',
}: any): JSX.Element => {
  const widthValue = {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    full: '100%',
  }

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

  const unsupportedChainId =
    chainId && !Object.keys(CHAIN_INFO).includes(chainId.toString())
  const errorDisplay = unsupportedChainId
    ? {
        title: 'Unsupported Chain ID',
        body: `Chain ID ${chainId} is not supported by Splits. Supported chainId's include: ${Object.keys(
          CHAIN_INFO,
        ).join(', ')}.`,
      }
    : error

  const isDark = themeClass[theme] === 'dark'

  return (
    <div
      className={`${themeClass[theme]}`}
      style={{ width: widthValue[width] }}
    >
      <div
        className={`w-full grid font-sans text-left text-sm min-h-[18rem] dark:text-white border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-700 divide-y dark:divide-gray-700 divide-gray-200`}
      >
        <div className="p-4">
          {errorDisplay ? (
            <div className="text-center my-8 space-y-2">
              <div className="text-lg">{errorDisplay.title}</div>
              <div className="text-xs max-w-md">{errorDisplay.body}</div>
            </div>
          ) : (
            body
          )}
        </div>
      </div>
    </div>
  )
}

export default ComponentLayout
