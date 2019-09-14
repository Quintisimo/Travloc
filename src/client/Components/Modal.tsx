import React, { FC } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { Photo } from '../../interface'
import { LatLng } from 'leaflet'

type Props = {
  open: boolean
  photo: Photo
  setOpen: (open: boolean) => void
}

const Modal: FC<Props> = ({ open, setOpen, photo }) => {
  const position = new LatLng(Number(photo.latitude), Number(photo.longitude))

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div
        style={{
          height: '60%',
          width: '80%',
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            height: 'calc(100% - 40px)',
            margin: '20px'
          }}
        >
          <h3
            style={{
              fontFamily: "'Fira Code', monospace",
              textTransform: 'capitalize'
            }}
          >
            {photo.title}
          </h3>
          <div
            style={{
              display: 'flex',
              height: 'calc(100% - 100px)'
            }}
          >
            <img
              style={{
                margin: '10px',
                height: '100%',
                maxWidth: '50%'
              }}
              src={photo.url_l}
            />
            <Map
              center={position}
              zoom={13}
              style={{ height: '100%', flex: 1, margin: '10px' }}
            >
              <TileLayer
                attribution={`<a target="_blank" href="https://maps.google.com/?q=${photo.latitude},${photo.longitude}">Open in Google Maps</a>`}
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={position} />
            </Map>
          </div>
        </div>
        <button
          onClick={e => setOpen(false)}
          style={{
            outline: 'none',
            border: '1px solid black',
            padding: '10px',
            background: 'red',
            borderRadius: '10px',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            fontSize: '15px',
            fontFamily: "'Fira Code', monospace",
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
