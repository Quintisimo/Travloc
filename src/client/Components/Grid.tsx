import React, { FC } from 'react'
import { Photo } from '../../interface'

type Props = {
  photos: Photo[]
  setOpen: (open: boolean) => void
  setPhoto: (photo: Photo) => void
}

const Grid: FC<Props> = ({ photos, setOpen, setPhoto }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }}
  >
    {photos.map(
      (photo, i) =>
        photo.url_l && (
          <div
            key={i}
            onClick={e => {
              setPhoto(photo)
              setOpen(true)
            }}
            title={photo.title}
            style={{
              height: '300px',
              width: '100%',
              cursor: 'pointer',
              backgroundImage: `url(${photo.url_l})`,
              backgroundSize: 'cover'
            }}
          />
        )
    )}
  </div>
)

export default Grid
