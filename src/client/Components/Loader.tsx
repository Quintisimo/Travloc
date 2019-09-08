import React, { FC } from 'react'
import Spinner from 'react-loading'

const Loader: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        fontFamily: "'Fira Code', monospace"
      }}
    >
      <Spinner type='balls' color='black' width={200} />
      <h2
        style={{
          paddingTop: '60px'
        }}
      >
        Loading images from Flickr
      </h2>
    </div>
  )
}

export default Loader
