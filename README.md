# react-fullscreen

> FUll Screen for react

[![NPM](https://img.shields.io/npm/v/react-fullscreen.svg)](https://www.npmjs.com/package/react-fullscreen) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-fullscreen
```

## Usage

```jsx
import React, { useEffect, useRef } from "react"
import useFullscreen from "react-fullscreen"

function useToggleWithKeys(keyCodes, callback) {
  const nodes = ['INPUT', 'TEXTAREA']

  useEffect(() => {
    const handkeKeydown = ({ target, metaKey, ctrlKey, altKey, keyCode }) => {
      if (nodes.includes(target.nodeName)) return // disable on input
      if (!ctrlKey && !metaKey && !altKey && keyCodes.includes(keyCode)) callback() // toggel fullscreen with keys
    }
    window.addEventListener('keydown', handkeKeydown)
    return () => window.removeEventListener('keydown', handkeKeydown)
  }, [])
}

export default function Gallery() {
  const galleryEl = useRef()
  const {
    isFullscreen, isFullScreenMode,
    openFullscreen, closeFullscreen
  } = useFullscreen()
  useToggleWithKeys([70], toggleFullscreen) // F Key

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
```

## License

MIT © [Tun Lin Phyo](https://github.com/tunlinphyo)
