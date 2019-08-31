/** @jsx jsx */
import React, { useEffect, FC, useState } from 'react'
import { Global, css, jsx } from '@emotion/core'
import { Params, Res, Photo } from '../../interface'

const App: FC = () => {
  const [params, setParams] = useState<Partial<Params>>({ page: 1 })
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetch('/api', {
      method: 'post',
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then((res: Res) => setPhotos(res.photos.photo))
    console.log('Request')
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
