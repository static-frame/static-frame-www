import React, { ReactNode } from 'react';
import Prism from "prismjs";
import 'prismjs/components/prism-python.min.js'
// import 'prismjs/themes/prism-twilight.css'
import 'prismjs/themes/prism-tomorrow.css'

import {SFBanner} from './components/SFBanner';
import {Header} from './components/Header';
import {Footer} from './components/Footer';

import {
    colorIconShowAll,
    colorIconHideAll,
    colorSearchButton,
    colorAccentOrange,
    cnCol1FlexCol,
    cnColFieldGradient,
    cnMaxWidthCentered,
  } from "./components/Common";


// NOTE: to update JSON from SF directory, use the following
// python3 doc/build_json.py --write --output ../static-frame-www/site-static-frame/src/sf-api

import sigsInitial from './sf-api/sigs.json';
import sigToDocJSON from './sf-api/sig_to_doc.json';
import sigToExJSON from './sf-api/sig_to_example.json';
import sigToGroupJSON from './sf-api/sig_to_group.json';

import methodToSigJSON from './sf-api/method_to_sig.json';
import sigFullToSigJSON from './sf-api/sig_full_to_sig.json';
import metadataJSON from './sf-api/metadata.json';

const sigToDoc = new Map<string, string>(Object.entries(sigToDocJSON));
const sigToEx = new Map<string, string[]>(Object.entries(sigToExJSON));
const sigToGroup = new Map<string, string>(Object.entries(sigToGroupJSON))

const methodToSig = new Map<string, string[]>(Object.entries(methodToSigJSON));
const sigFullToSig = new Map<string, string>(Object.entries(sigFullToSigJSON));

// create reverse mapping
const sigToSigFull = new Map();
sigFullToSig.forEach((v, k) => {
  sigToSigFull.set(v, k);
});

const versionAPI = metadataJSON.version

const CNTextSmall = "text-base text-zinc-400 font-sans"

const CNButtonCommon = "ml-1 my-1 p-2 w-8 rounded-md"; // my-2 permits buttons to wrap in narrow views
const CNButton =`${CNButtonCommon} bg-gradient-to-b from-zinc-600 to-zinc-700`;
const CNButtonActive = `${CNButtonCommon} bg-gradient-to-b from-zinc-700 to-zinc-600`;

const CNButtonHover = "ml-1 my-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-base text-zinc-400 font-sans";

const CNToolTipLeft = "pointer-events-none absolute opacity-0 bg-slate-600 rounded-md w-max p-2 -top-14 right-0 font-sans text-slate-100 text-right transition-opacity delay-500 group-hover:opacity-80"
// const CNToolTipRight = "pointer-events-none absolute opacity-0 bg-slate-600 rounded-md w-max p-2 -top-12 left-0 font-sans text-slate-100 text-right transition-opacity delay-700 group-hover:opacity-80"

// const colorIconShowAll = "#4ade80";
// const colorIconHideAll = "#ef4444";
// const colorSearchButton = "#64748b";
// const colorAccentOrange = "#fdba74";

const sigsEmpty: string[] = [];
const highlightColors = new Map<string, string>([
    ['',  "text-slate-400"], // default text colors
    [',', "text-slate-500"],
    ['.', "text-slate-300"],
    ['*', "text-indigo-400"],
    ['(', "text-slate-300"],
    [')', "text-slate-300"],
    ['[', "text-slate-300"],
    [']', "text-slate-300"],
])

//------------------------------------------------------------------------------
// SVG



interface IconProps {
    fill: string;
}
function IconDocument({fill, }: IconProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
    </svg>
    )
}

// https://icons.getbootstrap.com/icons/code/
function IconCode({fill, }: IconProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
    </svg>
    )
}
// https://icons.getbootstrap.com/icons/x-circle/
function IconClear({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
    )
}

function IconParameters({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
    </svg>
    )
}

// https://icons.getbootstrap.com/icons/regex/
function IconRE({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 1 1 .707.707Zm9.9-.707a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.314.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707ZM6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5 7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617V4.5Z"/>
    </svg>
    )
}

function IconGroup({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
    </svg>
    )
}

function IconClass({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill={fill} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
    </svg>
)
}

function IconWarning({fill, }: IconProps) {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" fill={fill} viewBox="0 0 16 16">
    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
    </svg>
    )
}

//------------------------------------------------------------------------------
// general

interface CodeBlockProps {
    code: string;
}

// alternate approach that tries to limit scope of prism application
function CodeBlock({ code }: CodeBlockProps) {
    const ref = React.useRef<HTMLPreElement>(null);
    React.useEffect(() => {
        if (ref.current) {
            Prism.highlightElement(ref.current);
        }
    }, []);
    return (
        <pre className="language-python" ref={ref}>
            <code>{code}</code>
        </pre>
    );
}

function renderIconButton(
    toolTip: string,
    Icon: React.FC<IconProps>,
    iconFill: string,
    onClick: () => void,
    className: () => string,
) {
    return (
        <span className="group relative">
            <button
                aria-label={toolTip}
                onClick={onClick}
                className={className()}
            >
                <Icon fill={iconFill} />
            </button>
            <span className={CNToolTipLeft}>{toolTip}</span>
        </span>
    );
}

//------------------------------------------------------------------------------
function APISearch() {
    //--------------------------------------------------------------------------
    // application state

    // sigsDisplay is used to populate the main list of signatures. Setting this updates the listed signatures.
    const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);

    // docDisplay, exDisplay, are Boolean mappings by signature used to indicate of docs / examples are displayed for a signature.
    const [docDisplay, setDocDisplay] = React.useState(new Map<string, boolean>());
    const [exDisplay, setExDisplay] = React.useState(new Map<string, boolean>());

    // Boolean flag sto determine search configuration
    const [fullSigSearch, setFullSigSearch] = React.useState(false);
    const [reSearch, setRESearch] = React.useState(false);

    // Optional warning display
    const [warningMsg, setWarningMsg] = React.useState("");

    // String used to store input from the user; asynchronously read from to conduct a search and populates sigsDisplay

    interface Query {
        target: string;
        runSearch: boolean;
    }
    const [query, setQuery] = React.useState<Query>({target: "", runSearch: false});


    //--------------------------------------------------------------------------

    // Return an li element for each value. Called once for each row after filtering. `value` is the sig
    function SignatureItem(value: string, index: number) {
        const className = value.split(".")[0];
        const groupName = sigToGroup.get(value);

        function SigLabel() {
            const sig = sigToSigFull.get(value);
            const sigSpans: ReactNode[] = [];
            const buffer: string[] = [];
            let key = 0;

            const bufToSpan = () => {
                if (buffer.length) {
                    sigSpans.push(<span className={highlightColors.get('')} key={key}>{buffer.join('')}</span>);
                    buffer.length = 0;
                    key++;
                }
            }
            [...sig].forEach(e => {
                if (highlightColors.has(e)) {
                    bufToSpan();
                    sigSpans.push(<span className={highlightColors.get(e)} key={key}>{e}</span>);
                    key++;
                }
                else {
                    buffer.push(e);
                }
            });
            bufToSpan();
            return (<span className="break-words">
                <span className="font-mono font-bold">
                {sigSpans}
                </span>
                </span>);
        }

        function onClickTagClass() {
            setFullSigSearch(false);
            setRESearch(false);
            const sigsFiltered: string[] = [];
            sigToGroup.forEach((value, key) => {
                if (key.split('.')[0] === className) {
                        sigsFiltered.push(key);
                    }
                }
            )
            setSigsDisplay(sigsFiltered);
            setQuery({target: "", runSearch: false});
        }

        function onClickTagGroup() {
            setFullSigSearch(false);
            setRESearch(false);
            const sigsFiltered: string[] = [];
            sigToGroup.forEach((value, key) => {
                if (key.split('.')[0] === className &&
                    value === groupName) {
                        sigsFiltered.push(key);
                    }
                }
            )
            setSigsDisplay(sigsFiltered);
            // setQuery({target:`${className} ${groupName}`, runSearch:false});
            setQuery({target: "", runSearch: false});
        }

        function onClickToggleDoc() {
            if (docDisplay.has(value)) {
                docDisplay.set(value, !docDisplay.get(value));
            }
            else {
                docDisplay.set(value, true);
            }
            setDocDisplay(new Map<string, boolean>(docDisplay));
        }

        function onClickToggleEx() {
            if (exDisplay.has(value)) {
                exDisplay.set(value, !exDisplay.get(value));
            }
            else {
                exDisplay.set(value, true);
            }
            setExDisplay(new Map<string, boolean>(exDisplay));
        }

        const buttonClass = renderIconButton(
            `Display all ${className} methods`,
            IconClass,
            colorSearchButton,
            onClickTagClass,
            () => CNButtonHover
            )

        const buttonGroup = renderIconButton(
            `Display all ${className} ${groupName} methods`,
            IconGroup,
            colorSearchButton,
            onClickTagGroup,
            () => CNButtonHover
            )

        const buttonDoc = renderIconButton(
            "Show documentation",
            IconDocument,
            colorAccentOrange,
            onClickToggleDoc,
            () => docDisplay.get(value) ? CNButtonActive : CNButton
            )

        const buttonEx = renderIconButton(
            "Show example",
            IconCode,
            colorAccentOrange,
            onClickToggleEx,
            () => exDisplay.get(value) ? CNButtonActive : CNButton
            )

        function DocIfActive() {
            if (docDisplay.get(value)) {
                const doc = sigToDoc.get(value);
                if (doc) {
                    return <div className="py-2 font-sans text-slate-400">{doc}</div>;
                }
            }
            return <div/>
        }

        function ExIfActive() {
            if (exDisplay.get(value)) {
                const ex = sigToEx.get(value)?.join('\n');
                if (ex) {
                    return (
                        <div className="overflow-x-auto">
                        <CodeBlock code={ex}/>
                        </div>
                    );
                }
            }
            return <div/>
        }

        const cnRow = index % 2 ? 'px-2 py-1 bg-zinc-800 rounded-sm': 'px-2 py-1 bg-zinc-800/80 rounded-sm';
        // Return a single li for each row
        // NOTE: nowrap here to keep 2 over 2 in button minimal width display
        return (
            <li className={cnRow} key={value}>
                <div className="flex">
                    <span className="w-4/6 my-1">
                        <SigLabel />
                    </span>
                    <span className="w-2/6 text-right">
                        {buttonClass}
                        {buttonGroup}
                        <span className="flex flex-nowrap float-right">
                            {buttonDoc}
                            {buttonEx}
                        </span>
                    </span>
                </div>
                <div className="w-full">
                    <DocIfActive />
                    <ExIfActive />
                </div>
            </li>
            )
    }

    // Given a target, filter all signatures and update the sigsDisplay state
    // On fullSigSearch, reSearch update, this is called, updating setSigsDisplay
    const searchSigs = React.useCallback(
        ({target, runSearch}: Query) => {
        if (!runSearch) {
            return;
        }
        target = target.toLowerCase();
        if (!target) {
            setSigsDisplay(sigsEmpty);
            return;
        }
        let sigsFiltered: string[] = [];
        // NOTE: we always filter the entire list, not the subset of what was previously filtered

        if (fullSigSearch) {
            if (reSearch) {
                const re = new RegExp(target);
                sigFullToSig.forEach((value, key) => {
                    if (re.test(key.toLowerCase())) {
                        sigsFiltered.push(value);
                    }
                });
            }
            else {
                sigFullToSig.forEach((value, key) => {
                    if (key.toLowerCase().indexOf(target) > -1) {
                        sigsFiltered.push(value);
                    }
                });
            }
        }
        else {
            if (reSearch) {
                const re = new RegExp(target);
                sigsFiltered = sigsInitial.filter((row) => {
                    return re.test(row.toLowerCase());
                });
            }
            else {
                sigsFiltered = sigsInitial.filter((row) => {
                    return row.toLowerCase().indexOf(target) > -1;
                });
            }
        }
        setSigsDisplay(sigsFiltered);
    }, [reSearch, fullSigSearch]);

    function onClickFullSigSearch() {
        setFullSigSearch(!fullSigSearch);
    }

    function onClickRESearch() {
        setRESearch(!reSearch);
    }

    function onClickRandomMethod() {
        setFullSigSearch(false); // key will be a sig w/o parameters
        setRESearch(false);

        const keys = Array.from(methodToSig.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        // NOTE: setting sigsFiltered is faster than just calling setQuery, which alone will work
        const sigsFiltered = methodToSig.get(key);
        if (sigsFiltered) {
            setSigsDisplay(sigsFiltered);
        }
        setQuery({target:key, runSearch:false});
    }

    function onClickExampleRandom() {
        setFullSigSearch(false); // key will be a sig w/o parameters
        setRESearch(false);

        const keys = Array.from(sigToEx.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        // NOTE: setting sigsFiltered is faster than just calling setQuery, which alone will work
        setSigsDisplay([key]);
        setQuery({target:key, runSearch:false});
        exDisplay.set(key, true);
    }

    function onClickQueryClear() {
        setSigsDisplay(sigsEmpty); // always faster
        setQuery({target:"", runSearch:false});
    }

    function onClickExampleShowAll() {
        if (sigsDisplay.length === 0) {
            setWarningMsg("No signatures for which to display examples. Please enter a query.");
        }
        else if (sigsDisplay.length > 100) {
            setWarningMsg("Too many signatures to display all examples. Please narrow your search.");
        }
        else {
            sigsDisplay.forEach(e => exDisplay.set(e, true));
            setExDisplay(new Map<string, boolean>(exDisplay));
        }
    }

    function onClickExampleHideAll() {
        setExDisplay(new Map<string, boolean>());
    }

    function onClickDocShowAll() {
        if (sigsDisplay.length === 0) {
            setWarningMsg("No signatures for which to display documentation. Please enter a query.");
        }
        else if (sigsDisplay.length > 100) {
            setWarningMsg("Too many signatures to display all documentation. Please narrow your search.");
        }
        else {
            sigsDisplay.forEach(e => docDisplay.set(e, true));
            setDocDisplay(new Map<string, boolean>(docDisplay));
        }
    }
    function onClickDocHideAll() {
        setDocDisplay(new Map<string, boolean>());
    }

    //--------------------------------------------------------------------------
    // status and general selection controls
    function ReportResults() {
        const len = sigsDisplay.length;
        if (len > 0) {
            return <span className="pl-2"><span className={CNTextSmall}>{len} {len === 1 ? "Result" : "Results"}</span></span>
        }
        return <span className={CNTextSmall}>{"No Results"}</span>
    }

    function ShowHideAll() {
        const buttonDocShowAll = renderIconButton(
            "Show all documentation",
            IconDocument,
            colorIconShowAll,
            onClickDocShowAll,
            () => CNButtonHover,
            );

        const buttonDocHideAll = renderIconButton(
            "Hide all documentation",
            IconDocument,
            colorIconHideAll,
            onClickDocHideAll,
            () => CNButtonHover,
            );

        const buttonExShowAll = renderIconButton(
            "Show all examples",
            IconCode,
            colorIconShowAll,
            onClickExampleShowAll,
            () => CNButtonHover,
            );

        const buttonExHideAll = renderIconButton(
            "Hide all examples",
            IconCode,
            colorIconHideAll,
            onClickExampleHideAll,
            () => CNButtonHover,
            );

        // NOTE: nowrap here to keep 2 over 2 in minimal width display
        return (
        <span>
            {buttonDocShowAll}
            {buttonDocHideAll}
            <span className="flex flex-nowrap float-right">
                {buttonExShowAll}
                {buttonExHideAll}
            </span>
        </span>
        )
    }

    function Warning() {
        // msg will be removed with timeout and useEffect, below
        if (warningMsg) {
            return (
                <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 py-8 px-8 my-2 mx-8 rounded-xl">
                <div className="w-full flex justify-center items-center pb-2">
                    <IconWarning fill={colorAccentOrange} />
                </div>
                <div className="text-zinc-200 text-l text-center">{warningMsg}</div>
            </div>);
        }
        return <div />
    }
    //--------------------------------------------------------------------------
    // On query updates, set a timeout before calling searchSigs. This means that any update to query will call searchSigs and update the display.
    React.useEffect(() => {
        const timeOutId = setTimeout(() => searchSigs(query), 800);
        return () => clearTimeout(timeOutId);
        }, [query, searchSigs]);

    React.useEffect(() => {
        const timeOutId = setTimeout(() => setWarningMsg(""), 3000);
        return () => clearTimeout(timeOutId);
        }, [warningMsg]);

    //--------------------------------------------------------------------------
    // Return the complete API search app
    const buttonClear = renderIconButton("Clear query",
            IconClear,
            colorSearchButton,
            onClickQueryClear,
            () => CNButtonHover);

    const buttonRe = renderIconButton("Use regular expression",
            IconRE,
            colorSearchButton,
            onClickRESearch,
            () => reSearch ? CNButtonActive : CNButton);

    const buttonFullSig = renderIconButton("Include parameter names",
            IconParameters,
            colorSearchButton,
            onClickFullSigSearch,
            () => fullSigSearch ? CNButtonActive : CNButton);

    const versionLink = <a
        className='text-zinc-500'
        href={`https://pypi.org/project/static-frame/${versionAPI}/`}
        target="_blank"
        rel="noopener noreferrer"
        >{versionAPI}</a>

    return (
    <div className="space-y-2">
        <div className='px-2'>
            <span className="text-2xl text-slate-400 text-bold">StaticFrame API Search</span>
        </div>
        <div className="px-2">
            <p className={CNTextSmall}>
                Search {sigsInitial.length.toLocaleString()} endpoints and view {sigToEx.size.toLocaleString()} code examples of the {versionLink} API.
            </p>
        </div>
        <div>
            <button onClick={onClickRandomMethod}
                aria-label="Random Method"
                className={CNButtonHover}>
                Random Method
            </button>
            <button onClick={onClickExampleRandom}
                aria-label="RandomExample"
                className={CNButtonHover}>
                Random Example
            </button>
        </div>
        {/*------------------------------------------------------------------*/}
        {/* NOTE: might make this a component, but trying to do so made text input unusable */}
        <div className="flex pr-2">
            <input type='text'
                aria-label="Search query"
                aria-required="true"
                value={query.target}
                onChange={e => setQuery({target: e.currentTarget.value, runSearch: true})}
                className="px-4 bg-zinc-800 w-full rounded-full text-base font-mono text-slate-200"
            />
            {buttonClear}
            {buttonRe}
            {buttonFullSig}
        </div>
        {/*------------------------------------------------------------------*/}
        <div className="flex pr-2">
            <span className="w-4/6">
                <ReportResults />
            </span>
            <span className="w-2/6 text-right float-right">
                <ShowHideAll />
            </span>
        </div>
        {/*------------------------------------------------------------------*/}
        <div>
            <Warning />
        </div>
        {/*------------------------------------------------------------------*/}
        <div className="pb-2">
            {/* NOTE: space-y adds space between each li row entry */}
            <ul className="space-y-2 text-base font-mono text-slate-400">
                {sigsDisplay.map(SignatureItem)}
            </ul>
        </div>

    </div>
    )
}

export default function App() {

    return (
    <div>
        <Header />
        <div className="h-screen overflow-x-auto">
            <div className="h-6"></div>
            <div className={cnMaxWidthCentered}>

                <div className="flex flex-wrap px-2 py-2 my-4 bg-black rounded-md">
                    <div className={cnCol1FlexCol}>
                      <div className={cnColFieldGradient}>
                        <SFBanner />
                      </div>
                    </div>
                </div>

                <div className="flex flex-wrap px-2 pt-2 bg-black rounded-md">
                    <div className={cnCol1FlexCol}>
                        <APISearch />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    </div>
    );
}


