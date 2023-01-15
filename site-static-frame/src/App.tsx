import React from 'react';
import Prism from "prismjs";
import 'prismjs/components/prism-python.min.js'
// import 'prismjs/themes/prism-twilight.css'
import 'prismjs/themes/prism-tomorrow.css'
// import './App.css';

import sigsInitial from './sf-api/sigs.json';
import sigToDocJSON from './sf-api/sig_to_doc.json';
import sigToExJSON from './sf-api/sig_to_example.json';
import methodToSigJSON from './sf-api/method_to_sig.json';
import sigFullToSigJSON from './sf-api/sig_full_to_sig.json';

const sigToDoc = new Map<string, string>(Object.entries(sigToDocJSON));
const sigFullToSig = new Map<string, string>(Object.entries(sigFullToSigJSON));

const sigToEx = new Map<string, string[]>(Object.entries(sigToExJSON));
const methodToSig = new Map<string, string[]>(Object.entries(methodToSigJSON));

// create reverse mapping
const sigToSigFull = new Map();
sigFullToSig.forEach((v, k) => {
  sigToSigFull.set(v, k);
});


const CNTextSmall = "text-1xl text-zinc-400 font-sans"

const colorIconShowAll = "#4ade80";
const colorIconHideAll = "#f87171";

interface SFSVGProps {
    ring: string;
    infinity: string;
    frame: string;
}
function SFSVG({ring, infinity, frame}: SFSVGProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 228 228">
    <path d="M113.39,0A113.39,113.39,0,1,1,33.21,33.21,113,113,0,0,1,113.39,0m0,17.19a96.21,96.21,0,1,0,68,28.18A95.84,95.84,0,0,0,113.39,17.19Z" fill={ring}/>
    <path d="M156.74,91.41l3.08-.91h0l14.11-4.15v.31h0v17.57l-2.17.64h0l-15,4.41Z" fill={frame}/>
    <path d="M104.79,107.3v-.57l0-.07h0V78.26a34.64,34.64,0,0,1,69-4.23l-16.95,5c0-.25,0-.5,0-.75a17.45,17.45,0,1,0-34.89,0h0v23.33L137.76,97l7-2.06v.31h0v17.57l-2.18.64h0l-15,4.41h0L122,119.47V120l0,.08h0v28.39A34.61,34.61,0,1,1,77.6,115.3h0Zm25.84,10.2,0,.07h0Zm-25.84,31h0V125.18l-22.36,6.57h0a17.46,17.46,0,1,0,22.36,16.76Z" fill={infinity}/>
    </svg>
    )
}

interface IconProps {
    fill: string;
}

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
// https://icons.getbootstrap.com/icons/x-circle/
function IconClear({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
    )
}

function SFLogo() {
    return (
        <div className="float-right">
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
        <p className={CNTextSmall}>A Python library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
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

interface CodeBlockProps {
    code: string;

}
function CodeBlock({code}: CodeBlockProps) {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
      <pre className="language-python">
        <code>{code}</code>
      </pre>
    );
  };

function APISearch() {
    const sigsEmpty: string[] = [];
    const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);
    const [docDisplay, setDocDisplay] = React.useState(new Map<string, boolean>());
    const [exDisplay, setExDisplay] = React.useState(new Map<string, boolean>());
    const [fullSigSearch, setFullSigSearch] = React.useState(false);

    const [query, setQuery] = React.useState("");

    const CNButton = "ml-2 p-2 w-8 h-8 bg-zinc-800 rounded-md";
    const CNButtonActive = "ml-2 p-2 w-8 h-8 bg-zinc-600 rounded-md";

    const CNFullSigSearch = "ml-2 p-2 w-2/6 h-min bg-zinc-800 rounded-md text-1xl text-zinc-400 font-sans";
    const CNFullSigSearchActive = "ml-2 p-2 w-2/6 h-min bg-zinc-600 rounded-md text-1xl text-zinc-200 font-sans";

    const CNButtonHover = "ml-2 p-2 bg-zinc-800 hover:bg-zinc-600 rounded-md text-1xl text-zinc-400 font-sans";
    const CNToolTip = "pointer-events-none absolute opacity-0 bg-zinc-600 rounded-md w-max p-2 -top-14 right-0 font-sans text-slate-100 text-right transition-opacity delay-700 group-hover:opacity-80"

    // Return an li element for each value. Called once for each row after filtering. `value` is the sig
    function SignatureItem(value: string) {

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

        const label = <div className="py-1 break-words"><span className="font-mono text-slate-400 font-bold">{sigToSigFull.get(value)}</span></div>;

        const buttonDoc = <span className="group relative">
                <button onClick={onClickDoc}
                className={docDisplay.get(value) ? CNButtonActive : CNButton}>
                <IconDocument fill="#fdba74" />
                </button>
                <span className={CNToolTip}>Documentation</span>
                </span>;
        const buttonEx = <span className="group relative">
                <button onClick={onClickEx}
                className={exDisplay.get(value) ? CNButtonActive : CNButton}>
                <IconCode fill="#fdba74" />
                </button>
                <span className={CNToolTip}>Code Example</span>
                </span>;

        function DocIfActive() {
            if (docDisplay.get(value)) {
                const doc = sigToDoc.get(value);
                if (doc) {
                    return <div className="py-2 font-sans text-slate-300">{doc}</div>;
                }
            }
            return <div/>
        }
        function ExIfActive() {
            if (exDisplay.get(value)) {
                const ex = sigToEx.get(value)?.join('\n');
                if (ex) {
                    return (<div className="overflow-x-auto">
                        {/* <pre className="pt-4 font-mono text-slate-300">
                        </pre> */}
                        <CodeBlock code={ex}/>
                        </div>);
                }
            }
            return <div/>
        }

        // Return a single li for each row
        return (<div>
            <li className='px-4 py-2 bg-zinc-900' key={value}>
                <div className="flex">
                    <span className="w-4/6">
                    {label}
                    </span>
                    <span className="w-2/6 text-right">
                    {buttonDoc}
                    {buttonEx}
                    </span>
                </div>
                <div className="w-full">
                    <DocIfActive />
                    <ExIfActive />
                </div>
            </li>
            </div>)
    }

    // Given a target, filter all signatures and update the sigsDisplay state
    function searchSigs(target: string) {
        target = target.toLowerCase();
        if (!target) {
            setSigsDisplay(sigsEmpty);
            return;
        }
        let sigsFiltered: string[] = [];

        if (fullSigSearch) {
            sigFullToSig.forEach((value, key) => {
                if (key.toLowerCase().indexOf(target) > -1) {
                    sigsFiltered.push(value);
                }
            });
        }
        else { // NOTE: we always filter the entire list, not the subset of what was previously filtered
            sigsFiltered = sigsInitial.filter((row) => {
                return row.toLowerCase().indexOf(target) > -1;
            });
        }
        setSigsDisplay(sigsFiltered);
    };

    function onClickFullSigSearch() {
        setFullSigSearch(!fullSigSearch);
        // when this changes need to redo search, handled by useEffect below
    }

    function onClickRandomMethod() {
        setFullSigSearch(false); // key will be a sig w/o parameters
        const keys = Array.from(methodToSig.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        const sigsFiltered = methodToSig.get(key);
        if (sigsFiltered) {
            setSigsDisplay(sigsFiltered);
        }
        setQuery(key);
    }

    function onClickExampleRandom() {
        setFullSigSearch(false); // key will be a sig w/o parameters
        const keys = Array.from(sigToEx.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        setSigsDisplay([key]);
        setQuery(key);
        exDisplay.set(key, true);
    }

    function onClickQueryClear() {
        setQuery("");
    }

    function onClickExampleShowAll() {
        sigsDisplay.forEach(e => exDisplay.set(e, true));
        setExDisplay(new Map<string, boolean>(exDisplay));
    }

    function onClickExampleHideAll() {
        sigsDisplay.forEach(e => exDisplay.set(e, false));
        setExDisplay(new Map<string, boolean>(exDisplay));
    }

    function onClickDocShowAll() {
        // TODO: if sigsDisplay is large (over 500) this can crash the tab...
        sigsDisplay.forEach(e => docDisplay.set(e, true));
        setDocDisplay(new Map<string, boolean>(docDisplay));
    }
    function onClickDocHideAll() {
        sigsDisplay.forEach(e => docDisplay.set(e, false));
        setDocDisplay(new Map<string, boolean>(docDisplay));
    }

    function ReportResults() {
        const len = sigsDisplay.length;
        if (len > 0) {
            return <span className="pl-2"><span className={CNTextSmall}>{len} {len === 1 ? "Result" : "Results"}</span></span>
        }
        return <span/>
    }

    function ShowHideAll() {
        return (
        <span>
            <span className="pr-2">
                <span className="group relative">
                    <button onClick={onClickDocShowAll} className={CNButtonHover}>
                    <IconDocument fill={colorIconShowAll} />
                    </button>
                    <span className={CNToolTip}>Show all documentation</span>
                </span>
                <span className="group relative">
                    <button onClick={onClickDocHideAll} className={CNButtonHover}>
                    <IconDocument fill={colorIconHideAll} />
                    </button>
                    <span className={CNToolTip}>Hide all documentation</span>
                </span>
            </span>
            <span className="pr-4">
                <span className="group relative">
                    <button onClick={onClickExampleShowAll} className={CNButtonHover}>
                    <IconCode fill={colorIconShowAll} />
                    </button>
                    <span className={CNToolTip}>Show all examples</span>
                </span>
                <span className="group relative">
                    <button onClick={onClickExampleHideAll} className={CNButtonHover}>
                    <IconCode fill={colorIconHideAll} />
                    </button>
                    <span className={CNToolTip}>Hide all examples</span>
                </span>
            </span>
        </span>
        )
    }

    // On fullSigSearch update, redo searchSigs, calling setSigsDisplay
    React.useEffect(() => searchSigs(query),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [fullSigSearch]
            );

    // On query updates, set a timeout before calling searchSigs
    React.useEffect(() => {
        const timeOutId = setTimeout(() => searchSigs(query), 500);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [query]);

    return (
    <div className="space-y-4">
        <div className='px-2'>
            <h2 className="text-2xl text-slate-400 text-bold">API Search</h2>
        </div>
        <div className="px-2">
            <p className={CNTextSmall}>Search {sigsInitial.length} StaticFrame API endpoints. View {sigToEx.size} code examples.</p>
        </div>
        <div>
            <button onClick={onClickRandomMethod} className={CNButtonHover}>
                Random Method
            </button>
            <button onClick={onClickExampleRandom} className={CNButtonHover}>
                Random Example
            </button>
        </div>
        {/* text imput region */}
        <div className="flex">
            <div className="pr-2">
                <button onClick={onClickQueryClear} className={CNButtonHover}>
                <IconClear fill={"#64748b"}/>
                </button>
            </div>
            <input type='text'
                value={query}
                onChange={e => setQuery(e.currentTarget.value)}
                className="bg-zinc-800 py-2 px-4 mb-4 w-4/6 rounded-full text-1xl font-mono text-slate-200" />
            <button onClick={onClickFullSigSearch} className={fullSigSearch ? CNFullSigSearchActive : CNFullSigSearch}>
                Full Signature
            </button>
        </div>
        <div className="flex">
            <span className="w-2/6">
                <ReportResults />
            </span>
            <span className="w-4/6 text-right float-right">
                <ShowHideAll />
            </span>
        </div>
        <div>
            {/* NOTE: space-y adds space between each li row entry */}
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
    // const cnCol2FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/2 lg:w-1/2'
    const cnCol3FlexColShrinkable = "w-1/3 flex flex-col py-2 px-2 sm:w-1/3 lg:w-1/3"
    const cnColFieldGradient = "flex-1 px-4 py-4 rounded-md shadow-md bg-gradient-to-b from-zinc-800 to-zinc-900"
    // const cnColField = "flex-1 px-4 py-4 rounded-md shadow-md bg-zinc-800"

    return (
    <div>
        <div className="max-w-full mx-auto">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black">
        <div className="max-w-5xl mx-auto pr-8 pl-8 pt-4">
            {/* <p className={CNTextSmall}>test</p> */}
        </div>
        </div>
        </div>

        <div className="max-w-5xl mx-auto pr-8 pl-8 pt-4">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black rounded-md">

            <div className={cnCol1FlexCol}>
              <div className={cnColFieldGradient}>
                <SFLogo />
                <Title />
                <Description />
              </div>
            </div>

        </div>
        </div>

        <div className="max-w-5xl mx-auto pr-8 pl-8">
        <div className="-mx-4 flex flex-wrap my-4 px-2 py-2 bg-black rounded-md">
            <div className={cnCol3FlexColShrinkable}>
              <div className={cnColFieldGradient}>
              <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
              </div>
            </div>
            <div className={cnCol3FlexColShrinkable}>
              <div className={cnColFieldGradient}>
              <Link label='Docs' url='https://static-frame.readthedocs.io/en/latest/' />
              </div>
            </div>
            <div className={cnCol3FlexColShrinkable}>
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

