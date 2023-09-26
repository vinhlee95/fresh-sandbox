import { Handlers, PageProps } from "$fresh/server.ts";

let NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET: (req, ctx) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.map(n => n.toLowerCase()).filter((name) => name.includes(query.toLowerCase()));
    return ctx.render({ results, query });
  },
  POST: async (req, ctx) => {
    const form = await req.formData()
    const email = form.get('subscriberEmail')?.toString()
    if(!email) {
      return new Response('Invalid email', { status: 400 })
    }

    // Add subscriber to the list
    NAMES.push(email)

    // Redirect users to thank you page
    const headers = new Headers();
    headers.set("location", "/subscribe-success");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  }
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div>
      {/* GET method by default */}
      <>
        <form>
          <input type="text" name="q" value={query} />
          <button type="submit">Search</button>
        </form>
        <ul>
          {results.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </>
      <>
        <form method="POST">
          <input type="text" name="subscriberEmail" value="" />
          <button type="submit">Subscribe</button>
        </form>
      </>
    </div>
  );
}