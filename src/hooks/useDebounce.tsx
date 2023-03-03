import { useEffect, useRef, useState } from "react"

export default function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    const latestValue = useRef<string>(value)
    const latestDelay = useRef<number>(delay)

    useEffect(() => {
      latestValue.current = value
      latestDelay.current = delay
    }, [value, delay])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebouncedValue(latestValue.current)
      }, latestDelay.current)
  
      return () => {
        clearTimeout(timeout)
      }
    })
  
    return debouncedValue
  }