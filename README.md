# react-fullscreen

> FUll Screen for react

[![NPM](https://img.shields.io/npm/v/react-fullscreen.svg)](https://www.npmjs.com/package/react-fullscreen) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-fullscreen
```

## Usage

```jsx
import { useEffect, useRef } from 'react'

import useFullscreen from 'react-fullscreen'

export default function Gallery ({}) {
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
      <button className="toggle-fullscreen" onClick={toggleFullscreen} />

      <styls jsx>{`
        .gallery {
          width: 100%;
          height: 300px;
          background-color: #abc;
        }
        .gallery[data-fullscreen=true] {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}
```

## License

MIT © [Tun Lin Phyo](https://github.com/tunlinphyo)
