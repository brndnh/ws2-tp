import React, { useState, useEffect } from 'react';
import ResultsList from './ResultsList';

function HomePage({ navigate }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    // fetch results from PokeAPI
    const fetchResults = (searchQuery = '') => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=493')
            .then((res) => res.json())
            .then((data) => {
                let filteredData = data.results;
                if (searchQuery) {
                    filteredData = data.results.filter((pokemon) =>
                        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                setResults(filteredData.slice(0, 493));
            })
            .catch((err) => {
                console.error('Error fetching Pokémon data:', err);
                setError('Error fetching Pokémon data. Please try again later.');
            });
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchResults(query);
    };

    return (
        <div className="home-page">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Pokémon by name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            <ResultsList results={results} navigate={navigate} />
        </div>
    );
}

export default HomePage;
