import React, { useState, useEffect } from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function DetailPage({ pokemonUrl, navigate }) {
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pokemonUrl) return;
        fetch(pokemonUrl)
            .then((res) => res.json())
            .then((data) => setPokemonDetail(data))
            .catch((err) => {
                console.error('Error fetching Pokémon details:', err);
                setError('Error fetching Pokémon details.');
            });
    }, [pokemonUrl]);

    if (error) return <p className="error">{error}</p>;
    if (!pokemonDetail) return <p>Loading...</p>;

    return (
        <div className="detail-page">
            <h2>{capitalize(pokemonDetail.name)}</h2>
            {pokemonDetail.sprites && pokemonDetail.sprites.front_default && (
                <img
                    src={pokemonDetail.sprites.front_default}
                    alt={pokemonDetail.name}
                />
            )}
            <p>Height: {pokemonDetail.height}</p>
            <p>Weight: {pokemonDetail.weight}</p>

            {/* display types */}
            <h3>Type{pokemonDetail.types.length > 1 ? 's' : ''}:</h3>
            <ul>
                {pokemonDetail.types.map((typeInfo, index) => (
                    <li key={index}>
                        {capitalize(typeInfo.type.name)}
                    </li>
                ))}
            </ul>

            {/* display abilities */}
            <h3>Abilities:</h3>
            <ul>
                {pokemonDetail.abilities.map((abilityInfo, index) => (
                    <li key={index}>
                        {capitalize(abilityInfo.ability.name)}
                        {abilityInfo.is_hidden && ' (Hidden)'}
                    </li>
                ))}
            </ul>


            <button onClick={() => navigate('home')}>Back to Home</button>
        </div>
    );
}

export default DetailPage;
