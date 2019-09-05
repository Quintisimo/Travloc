/** @jsx jsx */
import Spinner from 'react-loading'
import { FC } from 'react'
import { css, jsx } from '@emotion/core'

const Loader: FC = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
      `}
    >
      <Spinner type='balls' color='black' width={200} />
      <h2
        css={css`
          padding-top: 60px;
        `}
      >
        Loading images from Flickr
      </h2>
    </div>
  )
}

export default Loader
