import { serve } from "https://deno.land/std@0.159.0/http/server.ts";

const port = 8080;

const handler = async (request: Request): Promise<Response> => {
    const { pathname } = (new URL(request.url).pathname === '/') ? {pathname: '/index.html'}: new URL(request.url);

    const file = await Deno.readTextFile(`.${pathname}`);
    const headers = pathname.includes('css')? {"content-type": "text/css"} : 
    pathname.includes('js')? {"content-type":"text/javascript"}:
    {
        "content-type": "text/html",
      };

    return new Response(file, { status: 200, headers});
};

await serve((_req) => 
    handler(_req)
, { port });