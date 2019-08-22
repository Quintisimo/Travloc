import Koa from 'koa'
import Router from 'koa-router'
import Unsplash from 'unsplash-js'
import 'isomorphic-fetch'
import { Res } from './interface'

const app = new Koa()
const router = new Router()
const unsplash = new Unsplash({
  applicationId: process.env.ACCESS_KEY,
  secret: process.env.SECRET_KEY
})

router.get('/api/:page', async ctx => {
  const res = await unsplash.search.photos('nature', ctx.params.page)
  const json: Res = await res.json()
  ctx.body = json.results
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
