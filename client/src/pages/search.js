import React from 'react'
import { useLocation } from 'react-router-dom'

export default () => {
    const { state } = useLocation()
    const results = state?.results

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Quick search</h1>
                <h2 className="subtitle">Search quickly on the fetched data</h2>

                <div className="field">
                    <div className="control">
                        <input
                            className="input is-medium"
                            type="text"
                            placeholder="Keywords go here"
                        />
                    </div>
                </div>

                {results.map((result, index) => (
                    <div class="card mt-5">
                        <header class="card-header">
                            <p class="card-header-title">{result.value}</p>
                            <a
                                href="#search"
                                class="card-header-icon"
                                aria-label="more options"
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <span class="icon">
                                    <i
                                        class="fas fa-angle-down"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <p>{result.html}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
