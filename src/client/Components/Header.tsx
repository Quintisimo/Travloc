/** @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/core'

const Header: FC = () => (
  <h1
    css={css`
      text-align: center;
      padding: 30px;
      font-size: 4vw;
      font-family: 'Fira Code', monospace;
      color: #707070;
    `}
  >
    Places to visit around the world
  </h1>
)

export default Header
