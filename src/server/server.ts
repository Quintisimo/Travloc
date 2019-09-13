import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import axios from 'axios'
import { Res, Params } from '../interface'

const app = new Koa()
const router = new Router()

router.get('/api', async ctx => {
  try {
    const params = <Params>ctx.params
    const res = await axios.get<Res>('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: process.env.FLICKR_ACCESS_KEY,
        text: 'nature',
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_l,geo',
        safe_search: 1,
        has_geo: 1,
        geo_context: 2,
        ...params
      }
    })
    ctx.body = res.data
  } catch (error) {
    ctx.throw(error)
  }
})

app.use(router.routes()).use(router.allowedMethods())

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, '../client-build')))
}

app.listen(5000)
