import React from 'react';
import './App.css';
import Header from './Header/Header';
import SearchTable from './SearchTable/searchTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <SearchTable />
      </body>
    </div>
  );
}

export default App;
