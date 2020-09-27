import React, { useState } from 'react'

const URL_REGEX = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
)

export default () => {
    const [links, setLinks] = useState([''])
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:8000/run', {
            method: 'POST',
            body: JSON.stringify({
                urls: links,
            }),
        })

        if (!response.ok) {
            console.log('SOMETHING HAPPENED BRO ', response)
            return
        }

        console.log('WEPALE TODO BIEN MI PANA ', response)
        setLoading(false)
    }

    return (
        <>
            {loading && (
                <progress class="progress is-small is-warning" max="100" />
            )}
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Quick Crawler</h1>
                        <h2 className="subtitle">
                            Tiny website indexer & search engine
                        </h2>
                    </div>
                </div>
            </section>

            <section className="hero is-primary mb-6">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Load links manually</h1>
                        {links.map((link, index) => (
                            <div className="field" key={index}>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Site to fetch"
                                        value={link}
                                        onChange={(e) => {
                                            const hold = [...links]
                                            hold[index] = e.target.value
                                            setLinks(hold)
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            className="button is-info mt-4"
                            onClick={() => setLinks([...links, ''])}
                        >
                            Add link
                        </button>

                        <button
                            className="button is-warning mt-4 ml-4"
                            disabled={!links.length}
                            onClick={submit}
                        >
                            Run crawler
                        </button>
                    </div>
                </div>
            </section>

            <section className="hero is-warning mb-6">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Bulk load</h1>
                        <h2 className="subtitle">Primary subtitle</h2>
                        <button className="button is-info">Load links</button>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Q-Crawler</strong> by{' '}
                        <a href="https://davidcedresx.github.io">
                            David Cedres
                        </a>
                        . The UI is powered by <strong>Bulma</strong>. The
                        backend is powered by <strong>Python</strong>.
                    </p>
                </div>
            </footer>
        </>
    )
}
