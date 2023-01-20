import React, { ReactNode } from 'react';
import Prism from "prismjs";
import 'prismjs/components/prism-python.min.js'
// import 'prismjs/themes/prism-twilight.css'
import 'prismjs/themes/prism-tomorrow.css'

import sigsInitial from './sf-api/sigs.json';

import sigToDocJSON from './sf-api/sig_to_doc.json';
import sigToExJSON from './sf-api/sig_to_example.json';
import sigToGroupJSON from './sf-api/sig_to_group.json';

import methodToSigJSON from './sf-api/method_to_sig.json';
import sigFullToSigJSON from './sf-api/sig_full_to_sig.json';

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

const version = '1.1.3'

const CNTextSmall = "text-base text-zinc-400 font-sans"

const CNButtonCommon = "ml-1 my-1 p-2 w-8 rounded-md"; // my-2 permits buttons to wrap in narrow views
const CNButton =`${CNButtonCommon} bg-gradient-to-b from-zinc-700 to-zinc-800`;
const CNButtonActive = `${CNButtonCommon} bg-gradient-to-b from-zinc-700 to-zinc-600`;

const CNButtonHover = "ml-1 my-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-base text-zinc-400 font-sans";

const CNToolTipLeft = "pointer-events-none absolute opacity-0 bg-slate-600 rounded-md w-max p-2 -top-14 right-0 font-sans text-slate-100 text-right transition-opacity delay-500 group-hover:opacity-80"
// const CNToolTipRight = "pointer-events-none absolute opacity-0 bg-slate-600 rounded-md w-max p-2 -top-12 left-0 font-sans text-slate-100 text-right transition-opacity delay-700 group-hover:opacity-80"

const colorIconShowAll = "#4ade80";
const colorIconHideAll = "#ef4444";
const colorSearchButton = "#64748b";
const colorAccentOrange = "#fdba74";

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

interface SFIconSVGProps {
    ring: string;
    infinity: string;
    frame: string;
    size: number;
}
function SFIconSVG({ring, infinity, frame, size}: SFIconSVGProps) {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={size} height={size} viewBox="0 0 228 228">
    <path d="M113.39,0A113.39,113.39,0,1,1,33.21,33.21,113,113,0,0,1,113.39,0m0,17.19a96.21,96.21,0,1,0,68,28.18A95.84,95.84,0,0,0,113.39,17.19Z" fill={ring}/>
    <path d="M156.74,91.41l3.08-.91h0l14.11-4.15v.31h0v17.57l-2.17.64h0l-15,4.41Z" fill={frame}/>
    <path d="M104.79,107.3v-.57l0-.07h0V78.26a34.64,34.64,0,0,1,69-4.23l-16.95,5c0-.25,0-.5,0-.75a17.45,17.45,0,1,0-34.89,0h0v23.33L137.76,97l7-2.06v.31h0v17.57l-2.18.64h0l-15,4.41h0L122,119.47V120l0,.08h0v28.39A34.61,34.61,0,1,1,77.6,115.3h0Zm25.84,10.2,0,.07h0Zm-25.84,31h0V125.18l-22.36,6.57h0a17.46,17.46,0,1,0,22.36,16.76Z" fill={infinity}/>
    </svg>
    )
}

function SFTitleSVG() {
    const fill = "#52525b";
    const size = 160;
    return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={size} height={size} viewBox="0 0 328 325">
    <path fill={fill} d="M46.65,21a9.91,9.91,0,0,0-2.06-1.47,38.65,38.65,0,0,0-4.41-2.25,42,42,0,0,0-5.78-2.06,23,23,0,0,0-6.27-.88q-8.62,0-8.63,5.78A4.58,4.58,0,0,0,20.43,23a8.28,8.28,0,0,0,2.75,2.11,25.14,25.14,0,0,0,4.55,1.71c1.83.53,4,1.11,6.37,1.77a83.69,83.69,0,0,1,9,3,24.23,24.23,0,0,1,6.81,4,16.31,16.31,0,0,1,4.31,5.83,20.17,20.17,0,0,1,1.52,8.24,20.6,20.6,0,0,1-2.2,9.94,18.72,18.72,0,0,1-5.83,6.57,25,25,0,0,1-8.33,3.63A41.61,41.61,0,0,1,29.69,71a53.11,53.11,0,0,1-7.84-.59A56.64,56.64,0,0,1,14,68.65,61.35,61.35,0,0,1,6.62,66,40.71,40.71,0,0,1,0,62.33l7.06-14A13.79,13.79,0,0,0,9.6,50.18,38.12,38.12,0,0,0,15,52.92a53.88,53.88,0,0,0,7.1,2.45A29.74,29.74,0,0,0,30,56.45q8.52,0,8.52-5.2A4.38,4.38,0,0,0,37.24,48a11.92,11.92,0,0,0-3.53-2.3,36.6,36.6,0,0,0-5.34-1.91q-3.09-.89-6.71-2a58.36,58.36,0,0,1-8.33-3.19,21.7,21.7,0,0,1-5.83-4A14.3,14.3,0,0,1,4.07,29.5a19.15,19.15,0,0,1-1.13-6.86A21.86,21.86,0,0,1,5,12.94a21,21,0,0,1,5.58-7.11,24.31,24.31,0,0,1,8.19-4.36A32.47,32.47,0,0,1,28.62,0a37.18,37.18,0,0,1,7.15.69,52.23,52.23,0,0,1,6.76,1.76,48.9,48.9,0,0,1,6,2.45c1.86.92,3.58,1.83,5.14,2.74Z"/>
    <path fill={fill} d="M117.7,14.7H96.53V70.17H80.46V14.7H59.19V.59H117.7Z"/>
    <path fill={fill} d="M137.59.59h14.5l25.39,69.58H161l-5.39-15.58H134l-5.29,15.58H112.21ZM153,43.51l-8.14-24.6-8.33,24.6Z"/>
    <path fill={fill} d="M230.5,14.7H209.33V70.17H193.26V14.7H172V.59H230.5Z"/>
    <path fill={fill} d="M238.33,70.17V.59h16.08V70.17Z"/>
    <path fill={fill} d="M263.72,34.79a35.11,35.11,0,0,1,2.35-12.5,34.14,34.14,0,0,1,6.86-11.12,35,35,0,0,1,11-7.94,34.31,34.31,0,0,1,14.7-3,33.09,33.09,0,0,1,17,4.21,27.26,27.26,0,0,1,10.73,11L314,24a14.28,14.28,0,0,0-3-4.56,16.15,16.15,0,0,0-4-2.94,16.53,16.53,0,0,0-4.41-1.57,23.21,23.21,0,0,0-4.41-.44,16.57,16.57,0,0,0-8,1.87,17.63,17.63,0,0,0-5.69,4.8,20,20,0,0,0-3.33,6.66,27,27,0,0,0-1.08,7.55,25,25,0,0,0,1.28,7.94A21.05,21.05,0,0,0,285,50.08a17.73,17.73,0,0,0,5.78,4.65,16.5,16.5,0,0,0,7.6,1.72,19.6,19.6,0,0,0,4.46-.54,18.28,18.28,0,0,0,4.41-1.67,15.86,15.86,0,0,0,3.87-2.94A13.81,13.81,0,0,0,314,46.84l13.13,7.75a20.61,20.61,0,0,1-4.65,6.86,28.82,28.82,0,0,1-7.11,5.09,38.17,38.17,0,0,1-8.53,3.14A37.7,37.7,0,0,1,298,70.76a31.12,31.12,0,0,1-13.87-3.09,35.18,35.18,0,0,1-10.88-8.18,37.57,37.57,0,0,1-7.06-11.57A36.27,36.27,0,0,1,263.72,34.79Z"/>
    <path fill={fill} d="M7.64,141.17V71.59H52.72v3.13H11.07v29.4H46.45v3H11.07v34Z"/>
    <path fill={fill} d="M66.25,141.17V71.59H94.86a17.43,17.43,0,0,1,8,1.86,21,21,0,0,1,6.32,4.85,22,22,0,0,1,4.12,6.81,21.42,21.42,0,0,1,1.47,7.74,23.68,23.68,0,0,1-1.23,7.65,21.22,21.22,0,0,1-3.48,6.47,19.59,19.59,0,0,1-5.39,4.7,16.81,16.81,0,0,1-7,2.25l17.44,27.25h-3.92L94,114.32H69.68v26.85Zm3.43-30H95.45a14,14,0,0,0,6.62-1.57,15.78,15.78,0,0,0,5-4.11,18.75,18.75,0,0,0,3.19-5.88,21,21,0,0,0,1.13-6.77A18.11,18.11,0,0,0,110.1,86a19.36,19.36,0,0,0-3.57-5.78,17.88,17.88,0,0,0-5.3-4,14.27,14.27,0,0,0-6.46-1.52H69.68Z"/>
    <path fill={fill} d="M150.53,71.59h2.94l29.89,69.58h-3.63l-10.29-24H134.55l-10.29,24h-3.72Zm17.83,42.63L152,75.9l-16.47,38.32Z"/>
    <path fill={fill} d="M258.72,141.17V78.25l-29.21,49.39h-2.35L198,78.25v62.92h-3.43V71.59h3.13l30.68,51.84L259,71.59h3.14v69.58Z"/>
    <path fill={fill} d="M326.93,138v3.14H281V71.59H326v3.13H284.39V104h36.46v3.13H284.39V138Z"/>
    </svg>
    )
}

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

function SFBanner() {
    return (
        <div className="flex ">
            <div className="justify-right items-right">
            <SFIconSVG ring='#27272a' infinity='#3f3f46' frame={colorAccentOrange} size={80} />
            </div>
            <div className="px-2 pt-1 h-20">
            <SFTitleSVG />
            </div>
        </div>
    )
}

function Description() {
    return (
        <div className='p-2'>
        <p className={CNTextSmall}>StaticFrame: A Python library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
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
        <div>
        <a
        className="text-base font-sans text-slate-400 "
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
// function CodeBlock({code}: CodeBlockProps) {
//     React.useEffect(() => {
//         Prism.highlightAll();
//     }, []); // NOTE: might have this dependent on docDisplay
//     return (
//     <pre className="language-python">
//     <code>{code}</code>
//     </pre>
//     );
// };

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
    function SignatureItem(value: string) {
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

        // Return a single li for each row
        // NOTE: nowrap here to keep 2 over 2 in button minimal width display
        return (
            <li className='px-2 py-1 bg-zinc-900' key={value}>
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


    return (
    <div className="space-y-2">
        <div className='px-2'>
            <span className="text-2xl text-slate-400 text-bold">StaticFrame API Search</span>
        </div>
        <div className="px-2">
            <p className={CNTextSmall}>
                Search {sigsInitial.length.toLocaleString()} API endpoints.
                View {sigToEx.size.toLocaleString()} code examples.
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

// https://laravel-news.com/tailwind-css-tips-and-tricks
function App() {
    const cnCol1FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/1 lg:w-1/1'
    // const cnCol2FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/2 lg:w-1/2'
    const cnCol3FlexColShrinkable = "w-1/3 flex flex-col py-2 px-2 sm:w-1/3 lg:w-1/3"
    const cnColFieldGradient = "flex-1 px-4 py-2 rounded-md shadow-md bg-gradient-to-b from-zinc-800 to-zinc-900"
    // const cnColField = "flex-1 px-4 py-4 rounded-md shadow-md bg-zinc-800"

    return (
    <div>
        {/* <div className="max-w-full mx-auto">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black">
        <div className="max-w-5xl mx-auto pr-8 pl-8 pt-4">
        </div>
        </div>
        </div> */}

        <div className="max-w-5xl mx-auto px-8 pt-4">
        <div className="-mx-4 flex flex-wrap px-2 py-2 bg-black rounded-md">
            <div className={cnCol1FlexCol}>
              <div className={cnColFieldGradient}>
                <SFBanner />
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
        <div className="-mx-4 flex flex-wrap px-2 pt-2 bg-black rounded-md">
            <div className={cnCol1FlexCol}>
                <APISearch />
            </div>
        </div>
        <div className="-mx-4 flex flex-wrap h-20">
            <div className="mx-4 my-2">
            <span className="text-right text-xs text-zinc-700 font-sans">StaticFrame site v{version}. Report issues or feature requests at the <a
        className="text-slate-600 "
        href={"https://github.com/static-frame/static-frame-www/issues"}
        target="_blank"
        rel="noopener noreferrer"
        >static-frame-www</a> GitHub repository.
            </span>
            </div>
        </div>
        </div>

    </div>
    );
}

export default App;

