import { useEffect, useState } from 'react'

export function useMockData<T>(data: T, delay = 800) {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<T>(data)

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(data)
      setIsLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [data, delay])

  return { data: value, isLoading }
}
