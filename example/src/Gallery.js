import React, { useEffect, useRef } from "react"
import useFullscreen from "react-fullscreen"

export default function Gallery() {
  const galleryEl = useRef()
  const {
    isFullscreen, isFullScreenMode,
    openFullscreen, closeFullscreen
  } = useFullscreen()

  useEffect(() => {
    const handkeKeydown = ({ metaKey, ctrlKey, altKey, keyCode }) => {
      if (!ctrlKey && !metaKey && !altKey && keyCode == 70) toggleFullscreen() // toggel fullscreen with F key
    }
    window.addEventListener('keydown', handkeKeydown)
    return () => window.removeEventListener('keydown', handkeKeydown)
  }, [])


  function toggleFullscreen() {
    if (isFullScreenMode()) closeFullscreen()
    else openFullscreen(galleryEl?.current)
  }

  return (
    <div
      className="gallery"
      ref={galleryEl}
      data-fullscreen={isFullscreen}
    >
      <img src="/emma.jpeg" alt="Emma Watson" />
      <button onClick={toggleFullscreen}></button>
      <style jsx>{`
        .gallery {
          width: 100%;
          max-width: 400px;
          margin: 20px auto;
          position: relative;
        }
        .gallery[data-fullscreen=true] {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img {
          width: 100%;
        }
        .gallery[data-fullscreen=true] img {
          max-width: 100vh;
          max-height: 100vh;
        }
        button {
          position: absolute;
          right: 20px;
          bottom: 20px;

          width: 42px;
          height: 32px;
          background-color: #fff;
          border: none;
          cursor: pointer;
        }
        button:hover {
          border: 2px solid #f00;
        }
      `}</style>
    </div>
  )
}