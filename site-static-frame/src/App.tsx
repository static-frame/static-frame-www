
// import { url } from 'inspector';
import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import sig_to_ex from './sf-api/1.0.0/sig_to_example.json';
import sigsInitial from './sf-api/1.0.0/sigs.json';

// NOTE: if creating a map, better to write out json just as a list of pairs
import sig_to_doc_raw from './sf-api/1.0.0/sig_to_doc.json';
let sigToDoc = new Map<string, string>(Object.entries(sig_to_doc_raw));



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

interface IconProps {
    fill: string;
}
// https://icons.getbootstrap.com/icons/file-earmark-text/
function IconDocument({fill, }: IconProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
    </svg>
    )
}

// https://icons.getbootstrap.com/icons/code/
function IconCode({fill, }: IconProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
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


function APISearch() {
    // console.log(sig_to_ex);
    // console.log(sigs);

    const sigsEmpty: string[] = [];
    const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);
    const [sigsPreFilter, ] = React.useState(sigsInitial);

    const [docDisplay, setDocDisplay] = React.useState(new Map<string, boolean>());
    const [exDisplay, setExDisplay] = React.useState(new Map<string, boolean>());

    // const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);
    const classNameButton = "ml-2 p-2 w-8 h-8 bg-zinc-800 font-mono text-slate-400 rounded-md";

    function SignatureItem(value: string, index: number) {

        function onClickDoc() {
            if (docDisplay.has(value)) {
                docDisplay.set(value, !docDisplay.get(value));
            }
            else {
                docDisplay.set(value, true);
            }
            setDocDisplay(new Map<string, boolean>(docDisplay));
        }
        function onClickEx() {
            if (exDisplay.has(value)) {
                exDisplay.set(value, !exDisplay.get(value));
            }
            else {
                exDisplay.set(value, true);
            }
            setExDisplay(new Map<string, boolean>(exDisplay));
        }

        const label = <div className="py-1"><span className="font-mono text-slate-400">{value}</span></div>

        // replce Docs/Example with unicode or SVG
        const buttonDoc = <button onClick={onClickDoc} className={classNameButton}><IconDocument fill="#fdba74"></IconDocument></button>
        const buttonEx = <button onClick={onClickEx} className={classNameButton}><IconCode fill="#fdba74"></IconCode></button>

        const getDoc = () => <div className="pt-4 font-sans text-slate-300">{sigToDoc.get(value)}</div>;
        const getEx = () => <div className="pt-4 font-mono text-slate-300">{sigToDoc.get(value)}</div>;

        return (<div className=''>
            <li className='px-4 py-2 bg-zinc-900' key={index}>
                <div className="flex">
                    <span className="w-5/6">
                    {label}
                    </span>
                    <span className="w-1/6 text-right">
                    {buttonDoc}
                    {buttonEx}
                    </span>
                </div>
                <div className="w-full">
                {docDisplay.get(value) ? getDoc() : null}
                {exDisplay.get(value) ? getEx() : null}
                </div>
            </li>
        </div>)
    }

    function searchSigs(e: React.FormEvent<HTMLInputElement>) {
        const target = e.currentTarget.value.toLowerCase();

        if (!target) {
            setSigsDisplay(sigsEmpty);
            return;
        }

        // NOTE: we always filter the entire list, not the subset of what was previously filtered
        const sigs_filtered = sigsPreFilter.filter((row) => {
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
            <input type='text' onChange={searchSigs} className="bg-zinc-800 py-2 px-4 mb-4 w-full rounded-full text-1xl font-mono text-slate-200" />
        </div>
        <div>
            {/* NOTE: space-y adds space between */}
            <ul className="space-y-2 text-1xl font-mono text-slate-400">
                {sigsDisplay.map(SignatureItem)}
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

