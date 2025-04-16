import React, { useState, useEffect } from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function DetailPage({ pokemonUrl, navigate }) {
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [error, setError] = useState(null);
    const [favourited, setFavourited] = useState(false);

    useEffect(() => {
        if (!pokemonUrl) return;
        fetch(pokemonUrl)
            .then((res) => res.json())
            .then((data) => setPokemonDetail(data))
            .catch((err) => {
                console.error('Error fetching Pokemon details:', err);
                setError('Error fetching Pokemon details.');
            });
    }, [pokemonUrl]);

    // checks if the pokemon is already favourited once its details are loaded.
    useEffect(() => {
        if (pokemonDetail) {
            const favourites = JSON.parse(localStorage.getItem('favouritePokemon')) || [];
            if (favourites.find(item => item.id === pokemonDetail.id)) {
                setFavourited(true);
            } else {
                setFavourited(false);
            }
        }
    }, [pokemonDetail]);

    // toggle favourite
    const handleToggleFavourite = () => {
        const favourites = JSON.parse(localStorage.getItem('favouritePokemon')) || [];
        if (!favourited) {
            // creates a simplified version of the pokemon data to save
            const newFavourite = {
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                url: pokemonUrl,
                sprite: pokemonDetail.sprites?.front_default || ''
            };
            favourites.push(newFavourite);
            localStorage.setItem('favouritePokemon', JSON.stringify(favourites));
            setFavourited(true);
        } else {
            // removes this pokemon from the favourites.
            const updatedFavourites = favourites.filter(item => item.id !== pokemonDetail.id);
            localStorage.setItem('favouritePokemon', JSON.stringify(updatedFavourites));
            setFavourited(false);
        }
    };

    if (error) return <p className="error">{error}</p>;
    if (!pokemonDetail) return <p>Loading...</p>;

    return (
        // pokemon details
        <div className="detail-page">
            <h2>{capitalize(pokemonDetail.name)}</h2>
            {pokemonDetail.sprites && pokemonDetail.sprites.front_default && (
                <img
                    src={pokemonDetail.sprites.front_default}
                    alt={pokemonDetail.name}
                />
            )}
            <p>Height: {pokemonDetail.height}0cm</p>
            <p>Weight: {pokemonDetail.weight}g</p>

            <h3>Type{pokemonDetail.types.length > 1 ? 's' : ''}:</h3>
            <ul>
                {pokemonDetail.types.map((typeInfo, index) => (
                    <li key={index}>{capitalize(typeInfo.type.name)}</li>
                ))}
            </ul>

            <h3>Abilities:</h3>
            <ul>
                {pokemonDetail.abilities.map((abilityInfo, index) => (
                    <li key={index}>
                        {capitalize(abilityInfo.ability.name)}
                        {abilityInfo.is_hidden && ' (Hidden)'}
                    </li>
                ))}
            </ul>

            <div className="button-container">
                <button onClick={handleToggleFavourite}>
                    {favourited ? 'Unfavourite' : 'Add to Favourites'}
                </button>
            </div>
            <div className="button-container">
                <button onClick={() => navigate('saved')}>View Favourites</button>
            </div>
            <div className="button-container">
                <button onClick={() => navigate('home')}>Back to Home</button>
            </div>
        </div>
    );
}

export default DetailPage;
