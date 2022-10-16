
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
        <h1 className="text-4xl text-gray-400 text-bold">StaticFrame</h1>
        </div>
    )
}

function Description() {
    return (
        <div className='p-2 rounded-md bg-zinc-800'>
        <p className="text-1xl text-zinc-400 font-sans">A library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
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
        <div className='p-2'>
        <a
        className="text-1xl font-sans text-slate-400"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        >{label}</a>
        </div>
    )
}

// https://laravel-news.com/tailwind-css-tips-and-tricks

function App() {

  return (

    <div>
        <div className="max-w-xl mx-auto px-8 pt-8">
        <div className="-mx-4 flex flex-wrap px-2 bg-black ">

            <div className="w-full flex flex-col py-4 px-2 sm:w-1/2 lg:w-1/2">
              <div className="flex-1 px-4 py-4 bg-zinc-800 rounded-md shadow-md">
                  <SFLogo />
                  <Title />
              </div>
            </div>

            <div className="w-full flex flex-col py-4 px-2 sm:w-1/2 lg:w-1/2">
              <div className="flex-1 px-4 py-4 bg-zinc-800 rounded-md shadow-md">
                <Description />
              </div>
            </div>

        </div>
        </div>


        <div className="max-w-xl mx-auto px-8">
        <div className="-mx-4 flex flex-wrap my-4 py-4 px-2 bg-black">

            <div className="w-full flex flex-col py-0 px-2 sm:w-1/3 lg:w-1/3">
              <div className="flex-1 px-4 py-0 bg-zinc-800 rounded-md shadow-md">
              <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
              </div>
            </div>

            <div className="w-full flex flex-col py-0 px-2 sm:w-1/3 lg:w-1/3">
              <div className="flex-1 px-4 py-0 bg-zinc-800 rounded-md shadow-md">
              <Link label='Docs' url='https://static-frame.readthedocs.io/en/latest/' />
              </div>
            </div>

            <div className="w-full flex flex-col py-0 px-2 sm:w-1/3 lg:w-1/3">
              <div className="flex-1 px-4 py-0 bg-zinc-800 rounded-md shadow-md">
              <Link label='Try it now' url='https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb' />
              </div>
            </div>

        </div>
        </div>

    </div>
  );
}

export default App;

