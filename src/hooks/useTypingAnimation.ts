import { useEffect, useState } from 'react'

export function useTypingAnimation(text: string, speed = 50, delay = 0): string {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHasStarted(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) return

    const timeout = window.setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => window.clearTimeout(timeout)
  }, [currentIndex, hasStarted, speed, text])

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setHasStarted(false)
  }, [text])

  return displayedText
}
