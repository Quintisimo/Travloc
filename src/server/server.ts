import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import Body from 'koa-body'
import Router from 'koa-router'
import axios from 'axios'
import { Res, Params } from '../interface'

const app = new Koa()
const router = new Router()

router.post('/api', async ctx => {
  try {
    const params = <Params>ctx.request.body
    const res = await axios.get<Res>('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: process.env.FLICKR_ACCESS_KEY,
        text: 'nature',
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_l,geo',
        safe_search: 1,
        ...params
      }
    })
    ctx.body = res.data
  } catch (error) {
    ctx.throw(400, error.response.data || error.response || error.message)
  }
})

app
  .use(Body())
  .use(router.routes())
  .use(router.allowedMethods())

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, '../client-build')))
}

app.listen(5000)
