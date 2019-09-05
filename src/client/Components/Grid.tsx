/** @jsx jsx */
import { FC, Dispatch, SetStateAction } from 'react'
import { css, jsx } from '@emotion/core'
import { Photo } from '../../interface'

type Props = {
  photos: Photo[]
  setOpen: Dispatch<SetStateAction<boolean>>
  setPhoto: Dispatch<SetStateAction<Photo>>
}

const Grid: FC<Props> = ({ photos, setOpen, setPhoto }) => (
  <div
    css={css`
      line-height: 0;
      column-count: 5;
      column-gap: 0;
    `}
  >
    {photos.map(
      photo =>
        photo.url_l && (
          <img
            key={photo.id}
            onClick={e => {
              setPhoto(photo)
              setOpen(true)
            }}
            css={css`
              width: 100%;
              height: auto;
              cursor: pointer;
            `}
            src={photo.url_l}
            alt={photo.title}
            title={photo.title}
          />
        )
    )}
  </div>
)

export default Grid
