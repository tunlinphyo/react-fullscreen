import { useEffect, useState } from 'react'

export default function useFullscreen() {
  const [fullscreenMode, setFullscreenMode] = useState(false)
  const prefixes = ['', 'moz', 'webkit', 'ms']

  const onFullscreenChange = () => {
    setFullscreenMode(isFullScreenMode())
  }

  useEffect(() => {
    addEvents(onFullscreenChange)
    return () => removeEvents(onFullscreenChange)
  }, [])

  function addEvents(callback) {
    prefixes.forEach((prefix) => {
      document.addEventListener(prefix + 'fullscreenchange', callback)
    })
  }
  function removeEvents(callback) {
    prefixes.forEach((prefix) => {
      document.removeEventListener(prefix + 'fullscreenchange', callback)
    })
  }

  function openFullscreen(elem) {
    if (!elem) return
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen()
    }
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen()
    }
  }

  function isFullScreenMode() {
    // return !!document.fullscreenElement || !!document.webkitCurrentFullScreenElement
    if (document.fullscreenElement
      || document.webkitFullscreenElement
      || document.webkitCurrentFullScreenElement
      || document.mozFullScreenElement) return true
    return false
  }

  return {
    isFullscreen: fullscreenMode,
    isFullScreenMode,
    openFullscreen,
    closeFullscreen
  }
}
