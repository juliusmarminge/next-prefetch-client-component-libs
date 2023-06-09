export async function GET(req: Request) {
  console.log("GET", req.url);

  return new Response(JSON.stringify({ message: "Foo bar baz" }), {
    headers: { "content-type": "application/json" },
  });
}
