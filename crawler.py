import asyncio
import sys
import aiohttp
from aiohttp import ClientSession
from db import db, Link


async def fetch_html(url: str, session: ClientSession, **kwargs) -> str:
    resp = await session.request(method="GET", url=url, **kwargs)
    resp.raise_for_status()
    html = await resp.text()
    return html


async def parse(url: str, session: ClientSession, **kwargs) -> None:
    try:
        html = await fetch_html(url=url, session=session, **kwargs)
    except (
        aiohttp.ClientError,
        aiohttp.http_exceptions.HttpProcessingError,
        Exception,
    ) as e:
        db.update({"error": str(e)}, Link.value == url)
        return None
    else:
        return html


async def crawl_one(url: str, **kwargs) -> None:
    html = await parse(url=url, **kwargs)

    if not html:
        return None

    db.update({"html": html}, Link.value == url)


async def crawl_all(urls: set, **kwargs) -> None:
    async with ClientSession() as session:
        tasks = []
        for url in urls:
            tasks.append(crawl_one(url=url, session=session, **kwargs))
        await asyncio.gather(*tasks)


async def crawl() -> None:
    urls = map(lambda url: url["value"], db.all())
    await crawl_all(urls=urls)
