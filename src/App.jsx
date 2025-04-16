import React, { useState } from 'react';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import SavedCollectionPage from './components/SavedCollectionPage';

function App() {
  // currentPage can be 'home', 'detail', or 'saved'
  const [currentPage, setCurrentPage] = useState({ page: 'home', detail: null });

  const navigate = (page, detail = null) => {
    setCurrentPage({ page, detail });
  };

  return (
    <div className="App">
      <header>
        <h1>My Pokédex</h1>
      </header>
      <main>
        {currentPage.page === 'home' && <HomePage navigate={navigate} />}
        {currentPage.page === 'detail' && (
          <DetailPage pokemonUrl={currentPage.detail} navigate={navigate} />
        )}
        {currentPage.page === 'saved' && (
          <SavedCollectionPage navigate={navigate} />
        )}
      </main>
      <footer>
        <p>&copy; 2025 My Pokédex</p>
      </footer>
    </div>
  );
}

export default App;
