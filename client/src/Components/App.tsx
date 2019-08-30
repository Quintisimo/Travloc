import React, { useEffect, FC, useState } from 'react'
import { Params, Res, Photo } from '../../../interface'
import '../Styles/App.css'

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
    <>
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
      <div className='App'>
        {photos.map(photo => (
          <img key={photo.id} src={photo.url_l} alt={photo.title} />
        ))}
      </div>
    </>
  )
}

export default App
