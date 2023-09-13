import { PageProps } from '$fresh/server.ts'

export default function Page(props: Omit<PageProps, 'params'> & { params: { name: string } }) {
  return (
    <main>
      <h1>Hello {props.params.name}</h1>
    </main>
  )
}