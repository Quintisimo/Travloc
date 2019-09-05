/** @jsx jsx */
import React, { useEffect, FC, useState } from 'react'
import axios from 'axios'
import { Global, css, jsx } from '@emotion/core'
import { IoIosPin } from 'react-icons/io'
import Header from './Header'
import Loader from './Loader'
import Grid from './Grid'
import Modal from './Modal'
import { Params, Res, Photo } from '../../interface'

const App: FC = () => {
  const [params, setParams] = useState<Partial<Params>>({ page: 0 })
  const [photos, setPhotos] = useState<Photo[]>([])
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    setPhotos([])
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
            font-family: 'Fira Code', monospace;

            #root {
              display: flex;
              flex-direction: column;
              height: 100vh;
            }
          }
        `}
      />
      <button
        css={css`
          position: fixed;
          bottom: 20px;
          right: 20px;
          height: 60px;
          width: 60px;
          border-radius: 50%;
          font-size: 30px;
          display: flex;
          justify-content: center;
          color: red;
          background: black;
          border: none;
          outline: none;
          cursor: pointer;
        `}
        title='Get Location'
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
        <IoIosPin />
      </button>
      <Header />
      {photos.length ? (
        <Grid photos={photos} setOpen={setOpen} setPhoto={setPhoto} />
      ) : (
        <Loader />
      )}
      {photo !== null && <Modal open={open} setOpen={setOpen} photo={photo} />}
    </React.Fragment>
  )
}

export default App
