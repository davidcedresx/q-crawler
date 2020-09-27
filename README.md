# Quick Crawler

Web crawler with just one mission

    Design a web crawler that's capable of ingesting a list of URLs, and gives me the ability to search for text.

- It will offer a simple web UI to manage the crawler which will allow for:

  - Feeding links
  - Displaying progress
  - Allowing text searching on the data collected

## How to run

Create a python environment

    pyhton3 -m venv venv
    source ./venv/bin/activate

Install the dependencies and run the server

    pip install -r requirements.txt
    python server.py

Visit the frontend using your favorite browser. (It will connect to your local server even though it's hosted on netlify)

    xdg-open https://q-crawler.netlify.app/
