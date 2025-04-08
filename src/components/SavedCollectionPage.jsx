import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SavedCollectionPage() {
    const [savedResults, setSavedResults] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedResults')) || [];
        setSavedResults(saved);
    }, []);

    const removeResult = (id) => {
        const updatedResults = savedResults.filter(result => result.id !== id);
        localStorage.setItem('savedResults', JSON.stringify(updatedResults));
        setSavedResults(updatedResults);
    };

    return (
        <div className="saved-page">
            <h2>Saved Results</h2>
            {savedResults.length === 0 ? (
                <p>No saved entries yet.</p>
            ) : (
                <ul>
                    {savedResults.map(result => (
                        <li key={result.id}>
                            <Link to={`/detail/${result.id}`}>
                                <h3>{result.title}</h3>
                            </Link>
                            <button onClick={() => removeResult(result.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SavedCollectionPage;
