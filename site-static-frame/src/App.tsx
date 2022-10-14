import React from 'react';
import logo from './logo.svg';
// import './App.css';




function SFLogo() {
    return (
        <div>
        <img src={logo} style={{height: '40vmin'}}alt="flexatone logo" />
        </div>
    )
}

function Description() {
    return (
        <div>
        <p className="text-1xl text-zinc-600 font-sans">StaticFrame: A library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
        </p>
        </div>
    )
}

interface LinkProps {
    label: string;
    url: string;
}

function Link({label, url}:LinkProps) {
    return (
        <a
        className="text-1xl font-sans text-slate-500"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >{label}</a>
    )
}

function App() {

  return (
    <div className="p-8 max-w-sm mx-auto bg-black rounded-xl shadow-md flex items-center space-x-4">
        <Description />
        <div>
            <p className="text-gray-500">StaticFrame</p>
        </div>
        <SFLogo />
        <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
    </div>

  );
}

export default App;




//   <a
//     className="text-1xl font-sans text-slate-500"
//     href="https://github.com/InvestmentSystems/static-frame"
//     target="_blank"
//     rel="noopener noreferrer"
//   >Code</a>
//   <a
//     className="text-1xl font-sans text-slate-500"
//     href="https://static-frame.readthedocs.io/en/latest/"
//     target="_blank"
//     rel="noopener noreferrer"
//   >Documentation</a>
//   <a
//     className="text-1xl font-sans text-slate-500"
//     href="https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb"
//     target="_blank"
//     rel="noopener noreferrer"
//   >Try it now</a>
