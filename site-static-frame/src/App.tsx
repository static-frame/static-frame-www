
import React from 'react';
import logo from './logo.svg';
// import './App.css';




function SFLogo() {
    return (
        <div>
        <img src={logo} style={{height: '20vmin'}}alt="flexatone logo" />
        </div>
    )
}

function Title() {
    return (
        <div>
        <p className="text-gray-500">StaticFrame</p>
        </div>
    )
}

function Description() {
    return (
        <div>
        <p className="text-1xl text-zinc-600 font-sans">A library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
        </p>
        </div>
    )
}

interface LinkProps {
    label: string;
    url: string;
}

function Link({label, url}: LinkProps) {
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

    <div>
    <div className="p-8 py-8 mt-16 max-w-lg mx-auto bg-black rounded-md shadow-md flex">
        <div className='grid grid-cols-2 gap-2'>
            <div>
                <SFLogo />
            </div>
            <div>
                <Title />
            </div>
            <div>
            </div>
            <div>
                <Description />
            </div>
        </div>
    </div>

    <div className="p-8 py-4 mt-4 max-w-lg mx-auto bg-black rounded-md shadow-md flex">
        <div className='grid grid-cols-3 gap-2'>

            <div>
                <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
            </div>
            <div>
                <Link label='Docs' url='https://static-frame.readthedocs.io/en/latest/' />
            </div>
            <div>
                <Link label='Try it now' url='https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb' />
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;

