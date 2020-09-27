from aiohttp import web
import aiohttp_cors
from db import db
from crawler import crawl
from threading import Timer


app = web.Application()


# `aiohttp_cors.setup` returns `aiohttp_cors.CorsConfig` instance.
# The `cors` instance will store CORS configuration for the
# application.
cors = aiohttp_cors.setup(app)

# invokes crawler
async def run(request):
    body = await request.json()

    db.truncate()
    for url in body["urls"]:
        db.insert({"type": "url", "value": url})

    await crawl()
    data = db.all()
    return web.json_response(data)


# To enable CORS processing for specific route you need to add
# that route to the CORS configuration object and specify its
# CORS options.
resource = cors.add(app.router.add_resource("/run"))


route = cors.add(
    resource.add_route("POST", run),
    {
        "*": aiohttp_cors.ResourceOptions(allow_credentials=False),
    },
)


# app.router.add_static("/", "public")


# sets the server up
if __name__ == "__main__":
    web.run_app(app)
