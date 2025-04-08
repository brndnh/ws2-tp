import React, { useState } from 'react';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';

function App() {
    const [currentPage, setCurrentPage] = useState({ page: 'home', detail: null });

    // navigate function updates the current page
    const navigate = (page, detail = null) => {
        setCurrentPage({ page, detail });
    };

    return (
        <div className="App">
            <header>
                <h1>My Pokédex</h1>
            </header>
            <main>
                {currentPage.page === 'home' && (
                    <HomePage navigate={navigate} />
                )}
                {currentPage.page === 'detail' && (
                    <DetailPage pokemonUrl={currentPage.detail} navigate={navigate} />
                )}
            </main>
            <footer>
                <p>&copy; Pokédex</p>
            </footer>
        </div>
    );
}

export default App;
