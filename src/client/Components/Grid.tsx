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
      lineHeight: 0,
      columnCount: 5,
      columnGap: 0
    }}
  >
    {photos.map(
      (photo, i) =>
        photo.url_l && (
          <img
            key={i}
            onClick={e => {
              setPhoto(photo)
              setOpen(true)
            }}
            style={{
              width: '100%',
              height: 'auto',
              cursor: 'pointer'
            }}
            src={photo.url_l}
            alt={photo.title}
            title={photo.title}
          />
        )
    )}
  </div>
)

export default Grid
