/** @jsx jsx */
import React, { useEffect, FC, useState } from 'react'
import axios from 'axios'
import { Global, css, jsx } from '@emotion/core'
import { Params, Res, Photo } from '../../interface'
import Header from './Header'
import Grid from './Grid'
import Modal from './Modal'

const App: FC = () => {
  const [params, setParams] = useState<Partial<Params>>({ page: 1 })
  const [photos, setPhotos] = useState<Photo[]>([])
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState<Photo | null>(null)

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
      {/* <button
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
      </button> */}
      <Header />
      <Grid photos={photos} setOpen={setOpen} setPhoto={setPhoto} />
      {photo !== null && <Modal open={open} setOpen={setOpen} photo={photo} />}
    </React.Fragment>
  )
}

export default App
