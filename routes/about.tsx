import { Handlers } from '$fresh/server.ts'

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const res = await ctx.render()
    res.headers.set('X-Custom-Header', 'Hello World')
    return res
  }
}

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page</p>
    </main>
  )
}