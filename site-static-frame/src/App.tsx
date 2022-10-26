
// import { url } from 'inspector';
import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import './sf-api/sig_to_example.json';

interface SFSVGProps {
    ring: string;
    infinity: string;
    frame: string;
}
function SFSVG({ring, infinity, frame}: SFSVGProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.77 226.77">
        <path d="M113.39,0A113.39,113.39,0,1,1,33.21,33.21,113,113,0,0,1,113.39,0m0,17.19a96.21,96.21,0,1,0,68,28.18A95.84,95.84,0,0,0,113.39,17.19Z" fill={ring}/>
        <path d="M156.74,91.41l3.08-.91h0l14.11-4.15v.31h0v17.57l-2.17.64h0l-15,4.41Z" fill={frame}/>
        <path d="M104.79,107.3v-.57l0-.07h0V78.26a34.64,34.64,0,0,1,69-4.23l-16.95,5c0-.25,0-.5,0-.75a17.45,17.45,0,1,0-34.89,0h0v23.33L137.76,97l7-2.06v.31h0v17.57l-2.18.64h0l-15,4.41h0L122,119.47V120l0,.08h0v28.39A34.61,34.61,0,1,1,77.6,115.3h0Zm25.84,10.2,0,.07h0Zm-25.84,31h0V125.18l-22.36,6.57h0a17.46,17.46,0,1,0,22.36,16.76Z" fill={infinity}/>
        </svg>
    )
}
function SFLogo() {
    return (
        <div>
        <SFSVG ring='#27272a' infinity='#3f3f46' frame='#fdba74' />
        </div>
    )
}
function Title() {
    return (
        <div className='p-2'>
        <h1 className="text-3xl text-slate-400 text-bold">StaticFrame</h1>
        </div>
    )
}
function Description() {
    return (
        <div className='p-2'>
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
        <div className=''>
        <a
        className="text-1xl font-sans text-slate-400 "
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        >{label}</a>
        </div>
    )
}

// https://laravel-news.com/tailwind-css-tips-and-tricks

function App() {
  const cnCol2FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/2 lg:w-1/2'
  const cnCol3FlexCol = "w-full flex flex-col py-2 px-2 sm:w-1/3 lg:w-1/3"
  const cnColFieldGradient = "flex-1 px-4 py-4 rounded-md shadow-md bg-gradient-to-b from-zinc-800 to-zinc-900"
  const cnColField = "flex-1 px-4 py-4 rounded-md shadow-md bg-zinc-800"

  // const svgBkg = SFSVG({ring: '#013366', infinity:'#016699', frame:'#9fc9eb'});

  return (

    <div>
        <div className="max-w-xxl mx-auto px-8 pt-8">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black rounded-md">

            <div className={cnCol2FlexCol}>
              <div className={cnColFieldGradient}>
                  <SFLogo />
              </div>
            </div>
            <div className={cnCol2FlexCol}>
              <div className={cnColField}>
                <Title />
                <Description />
              </div>
            </div>

        </div>
        </div>


        <div className="max-w-xxl mx-auto px-8">
        <div className="-mx-4 flex flex-wrap my-4 px-2 py-2 bg-black rounded-md">
            <div className={cnCol3FlexCol}>
              <div className={cnColFieldGradient}>
              <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
              </div>
            </div>
            <div className={cnCol3FlexCol}>
              <div className={cnColFieldGradient}>
              <Link label='Docs' url='https://static-frame.readthedocs.io/en/latest/' />
              </div>
            </div>
            <div className={cnCol3FlexCol}>
              <div className={cnColFieldGradient}>
              <Link label='Try it now' url='https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb' />
              </div>
            </div>
        </div>
        </div>

    </div>
  );
}

export default App;

