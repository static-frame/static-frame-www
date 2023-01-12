
// import { url } from 'inspector';
import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import sig_to_ex from './sf-api/1.0.0/sig_to_example.json';
import sigs_initial from './sf-api/1.0.0/sigs.json';

interface SFSVGProps {
    ring: string;
    infinity: string;
    frame: string;
}
function SFSVG({ring, infinity, frame}: SFSVGProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 228 228">
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




function SignatureItem(value: string, index: number) {
    // onClick={toggleSearch}
    const label = <span className="font-mono text-slate-400">{value}</span>
    const button_doc = <button className=" bg-zinc-800 font-mono text-slate-400 rounded-md ml-2 p-1">Docs</button>
    const button_ex = <button className=" bg-zinc-800 font-mono text-slate-400 rounded-md ml-2 p-1">Example</button>

    return (<div className='px-4 py-1 bg-zinc-900'>
        <li key={index}>{label}{button_doc}{button_ex}</li>
    </div>)
}

function APISearch() {
    // console.log(sig_to_ex);
    // console.log(sigs);

    const sigs_empty: string[] = [];
    const [sigs_display, setSigsDisplay] = React.useState(sigs_empty);
    const [sigs_pre_filter, ] = React.useState(sigs_initial);

    function search_sigs(e: React.FormEvent<HTMLInputElement>) {
        const target = e.currentTarget.value.toLowerCase();

        if (!target) {
            setSigsDisplay(sigs_empty);
            return;
        }

        // NOTE: we always filter the entire list, not the subset of what was previously filtered
        const sigs_filtered = sigs_pre_filter.filter((row) => {
            return row.toLowerCase().indexOf(target) > -1;
        });
        setSigsDisplay(sigs_filtered);
    };

    return (
    <div className="space-y-4">
        <div className='px-2'>
            <h2 className="text-2xl text-slate-400 text-bold">API Search</h2>
        </div>
        <div className="px-2">
            <p className="text-1xl text-zinc-400 font-sans">Search the StaticFrame API.
            </p>
        </div>
        <div>
            <input type='text' onChange={search_sigs} className="bg-zinc-800 py-2 px-4 w-full rounded-full text-1xl font-mono text-slate-200" />
        </div>
        <div>
            {/* NOTE: space-y adds space between */}
            <ul className="space-y-2 text-1xl font-mono text-slate-400">
                {sigs_display.map(SignatureItem)}
            </ul>
        </div>
    </div>
    )
}


// https://laravel-news.com/tailwind-css-tips-and-tricks

function App() {
    const cnCol1FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/1 lg:w-1/1'
    const cnCol2FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/2 lg:w-1/2'
    const cnCol3FlexCol = "w-full flex flex-col py-2 px-2 sm:w-1/3 lg:w-1/3"
    const cnColFieldGradient = "flex-1 px-4 py-4 rounded-md shadow-md bg-gradient-to-b from-zinc-800 to-zinc-900"
    const cnColField = "flex-1 px-4 py-4 rounded-md shadow-md bg-zinc-800"

    // const svgBkg = SFSVG({ring: '#013366', infinity:'#016699', frame:'#9fc9eb'});


    return (

    <div>
        <div className="max-w-full mx-auto">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black">
            <div className={cnCol2FlexCol}>
              {/* <div className={cnColFieldGradient}>
              </div> */}
            </div>
            <div className={cnCol2FlexCol}>
              {/* <div className={cnColField}>
              </div> */}
            </div>
        </div>
        </div>


        <div className="max-w-5xl mx-auto pr-8 pl-8 pt-4">
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


        <div className="max-w-5xl mx-auto pr-8 pl-8">
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

        <div className="max-w-5xl mx-auto pr-8 pl-8">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black rounded-md">
            <div className={cnCol1FlexCol}>
                <APISearch />
            </div>
        </div>
        </div>

    </div>
    );
}

export default App;

