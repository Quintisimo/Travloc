/** @jsx jsx */
import { FC, Dispatch, SetStateAction } from 'react'
import { css, jsx } from '@emotion/core'
import { Photo } from '../../interface'

type Props = {
  open: boolean
  photo: Photo
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Modal: FC<Props> = ({ open, setOpen, photo }) => (
  <div
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      display: ${open ? 'flex' : 'none'};
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
    `}
  >
    <div
      css={css`
        height: 60%;
        width: 80%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
      `}
    >
      <div
        css={css`
          height: calc(100% - 40px);
          margin: 20px;
        `}
      >
        <h3
          css={css`
            font-family: 'Fira Code', monospace;
          `}
        >
          {photo.title}
        </h3>
        <img
          css={css`
            height: inherit;
            border-radius: 10px;
          `}
          src={photo.url_l}
        />
      </div>
      <button
        onClick={e => setOpen(false)}
        css={css`
          outline: none;
          border: 1px solid black;
          padding: 10px;
          background: red;
          border-radius: 10px;
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 15px;
          font-family: 'Fira Code', monospace;
          cursor: pointer;
        `}
      >
        Close
      </button>
    </div>
  </div>
)

export default Modal
