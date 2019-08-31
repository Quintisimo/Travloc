/** @jsx jsx */
import React, { useEffect, FC, useState } from 'react'
import axios from 'axios'
import { Global, css, jsx } from '@emotion/core'
import { Params, Res, Photo } from '../../interface'

const App: FC = () => {
  const [params, setParams] = useState<Partial<Params>>({ page: 1 })
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    axios
      .post<Res>('/api', params)
      .then(res => setPhotos(res.data.photos.photo))
      .catch(err => alert(err.message))
  }, [params])

  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
          }
        `}
      />
      <button
        onClick={e => {
          const loc = navigator.geolocation
          if (!loc) return alert('Location Not Supported')
          navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
              setParams({
                ...params,
                lon: coords.longitude,
                lat: coords.latitude
              }),
            ({ message }) => alert(message)
          )
        }}
      >
        Location
      </button>
      <div
        css={css`
          line-height: 0;
          column-count: 5;
          column-gap: 0;
        `}
      >
        {photos.map(photo => (
          <img
            key={photo.id}
            css={css`
              width: 100%;
              height: auto;
            `}
            src={photo.url_l}
            alt={photo.title}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
