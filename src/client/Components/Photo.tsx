import React, { useState, FC } from 'react'
import { Photo as PhotoType } from '../../interface'

type Props = {
  onClick: () => void
  photo: PhotoType
}

const Photo: FC<Props> = ({ onClick, photo }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={onClick}
      title={photo.title}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        gridRow: `span ${photo.span}`,
        cursor: 'pointer',
        backgroundImage: `url(${photo.url_l})`,
        backgroundSize: 'cover',
        position: 'relative'
      }}
    >
      {hover && (
        <div
          style={{
            color: 'white',
            fontFamily: "'Fira Code', monospace",
            background: 'coral',
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            bottom: 0
          }}
        >
          Click to Learn More
        </div>
      )}
    </div>
  )
}

export default Photo
