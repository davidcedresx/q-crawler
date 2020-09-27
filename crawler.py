import asyncio
import sys
import aiohttp
import logging
from aiohttp import ClientSession
from db import db, Link
from bs4 import BeautifulSoup


logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)


async def fetch_html(url: str, session: ClientSession, **kwargs) -> str:
    resp = await session.request(method="GET", url=url, **kwargs)
    resp.raise_for_status()
    html = await resp.text()
    return html


async def parse(url: str, session: ClientSession, **kwargs) -> None:
    try:
        html = await fetch_html(url=url, session=session, **kwargs)
        soup = BeautifulSoup(html)
        body = soup.get_text()

    except (
        aiohttp.ClientError,
        aiohttp.http_exceptions.HttpProcessingError,
        Exception,
    ) as e:
        logging.warning(e)
        print(e)
        db.update({"error": str(e)}, Link.value == url)
        return None
    else:
        return body


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
