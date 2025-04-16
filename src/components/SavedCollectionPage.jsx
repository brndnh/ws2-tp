import React, { useState, useEffect } from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function SavedCollectionPage({ navigate }) {
    const [savedResults, setSavedResults] = useState([]);

    useEffect(() => {
        // using the same local storage key as detail page
        const saved = JSON.parse(localStorage.getItem('favouritePokemon')) || [];
        setSavedResults(saved);
    }, []);

    const removeResult = (id) => {
        const updatedResults = savedResults.filter(result => result.id !== id);
        localStorage.setItem('favouritePokemon', JSON.stringify(updatedResults));
        setSavedResults(updatedResults);
    };

    return (
        <div className="saved-page">
            <h2>Saved Pokémon</h2>
            {savedResults.length === 0 ? (
                <p className='white-text'>No saved items yet.</p>
            ) : (
                <div className="saved-cards-grid">
                    {savedResults.map(result => (
                        <div key={result.id} className="detail-card">
                            <h3>{capitalize(result.name)}</h3>
                            {result.sprite && (
                                <img src={result.sprite} alt={result.name} />
                            )}
                            <div className="card-buttons">
                                <button onClick={() => navigate('detail', result.url)}>
                                    View Details
                                </button>
                                <button onClick={() => removeResult(result.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="button-container">
                <button onClick={() => navigate('home')}>Back to Home</button>
            </div>
        </div>
    );
}

export default SavedCollectionPage;
