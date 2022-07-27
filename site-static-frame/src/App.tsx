import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>StaticFrame: A library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
        </p>
        <a
          className="App-link"
          href="https://github.com/InvestmentSystems/static-frame"
          target="_blank"
          rel="noopener noreferrer"
        >Code</a>
        <a
          className="App-link"
          href="https://static-frame.readthedocs.io/en/latest/"
          target="_blank"
          rel="noopener noreferrer"
        >Documentation</a>
        <a
          className="App-link"
          href="https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb"
          target="_blank"
          rel="noopener noreferrer"
        >Try it now</a>
      </header>
    </div>
  );
}

export default App;
