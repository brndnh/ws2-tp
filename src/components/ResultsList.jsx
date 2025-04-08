import React from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// extracts pokemon ID from its URL
const getPokemonId = (url) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
};

function ResultsList({ results, navigate }) {
    if (!results.length) {
        return <p>No Pokémon found.</p>;
    }

    return (
        <ul className="results-list">
            {results.map((pokemon, index) => {
                const id = getPokemonId(pokemon.url);
                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                return (
                    
                    // allows for tabbing onto different boxes. (accessiblity)
                    <li
                        key={index}
                        onClick={() => navigate('detail', pokemon.url)}
                        role="button"
                        tabIndex="0"
                        style={{ cursor: 'pointer' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                navigate('detail', pokemon.url);
                            }
                        }}
                    >
                        <img src={spriteUrl} alt={capitalize(pokemon.name)} />
                        <h3>{capitalize(pokemon.name)}</h3>
                    </li>

                );
            })}
        </ul>
    );
}

export default ResultsList;
