import React, { FC } from 'react'
import Photo from './Photo'
import { Photo as PhotoType } from '../../interface'

type Props = {
  photos: PhotoType[]
  setOpen: (open: boolean) => void
  setPhoto: (photo: PhotoType) => void
}

const Grid: FC<Props> = ({ photos, setOpen, setPhoto }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gridAutoRows: '100px',
      gridGap: '10px'
    }}
  >
    {photos.map((photo, i) => (
      <Photo
        key={i}
        photo={photo}
        onClick={() => {
          setPhoto(photo)
          setOpen(true)
        }}
      />
    ))}
  </div>
)

export default Grid
