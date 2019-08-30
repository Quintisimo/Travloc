import Koa from 'koa'
import Router from 'koa-router'
import axios from 'axios'
import { Res } from './interface'

const app = new Koa()
const router = new Router()

router.get('/api/:page', async ctx => {
  const res = await axios.get<Res>('https://www.flickr.com/services/rest/', {
    params: {
      method: 'flickr.photos.search',
      api_key: process.env.FLICKR_ACCESS_KEY,
      text: 'nature',
      page: ctx.params.page,
      format: 'json',
      nojsoncallback: 1,
      lat: -27.3568209,
      lon: 153.0709907,
      extras: 'url_l,geo'
    }
  })
  ctx.body = res.data
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
