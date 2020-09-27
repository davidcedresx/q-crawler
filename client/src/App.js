import React, { useState } from 'react'

// const URL_REGEX = new RegExp(
//     /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
// )

export default () => {
    const [links, setLinks] = useState([
        'https://en.wikipedia.org/wiki/Shopify',
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [results, setResults] = useState(null)

    const submit = async () => {
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/run', {
                method: 'POST',
                body: JSON.stringify({
                    urls: links,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to fetch')
            } else {
                const data = await response.json()
                setResults(data)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }

        setLoading(false)
    }

    return (
        <>
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
                            disabled={loading}
                        >
                            Add link
                        </button>

                        <button
                            className="button is-warning mt-4 ml-4"
                            disabled={!links.length || loading}
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
                        <button className="button is-info" disabled={loading}>
                            Load links
                        </button>
                    </div>
                </div>
            </section>

            {error && (
                <div class="container">
                    <article className="message is-danger">
                        <div className="message-header">
                            <p>An error has occurred</p>
                            <button
                                className="delete"
                                aria-label="delete"
                                onClick={() => setError(null)}
                            ></button>
                        </div>
                        <div className="message-body">{error}</div>
                    </article>
                </div>
            )}

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

            <div className={`modal ${results || loading ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    {loading && (
                        <progress
                            className="progress is-small is-primary"
                            max="100"
                        />
                    )}

                    {results && (
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Results</p>
                                <button
                                    className="delete"
                                    aria-label="close"
                                    onClick={() => setResults(null)}
                                ></button>
                            </header>
                            <section
                                className="modal-card-body"
                                style={{ display: 'flex' }}
                            >
                                <table
                                    className="table"
                                    style={{ flexGrow: 1 }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Page</th>
                                            <th>Status</th>
                                            <th>Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((page, index) => (
                                            <tr key={index}>
                                                <td>{page.value}</td>
                                                <td>
                                                    {page.error ? (
                                                        <span className="icon has-text-danger">
                                                            <i className="fas fa-ban"></i>
                                                        </span>
                                                    ) : (
                                                        <span className="icon has-text-success">
                                                            <i className="fas fa-check-square"></i>
                                                        </span>
                                                    )}
                                                </td>
                                                <td>{page.error}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success">
                                    Search
                                </button>
                                <button
                                    className="button"
                                    onClick={() => setResults(null)}
                                >
                                    Cancel
                                </button>
                            </footer>
                        </div>
                    )}
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setResults(null)}
                ></button>
            </div>
        </>
    )
}
