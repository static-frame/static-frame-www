'use client';

import React from 'react';

import {SFBanner} from '../components/SFBanner';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import {CodeBlock, SigLabel} from '../components/CodeBlock';
import {
    IconProps,
    IconDocument,
    IconCode,
    IconClear,
    IconParameters,
    IconRE,
    IconGroup,
    IconClass,
    IconWarning,
    IconLink,
} from '../components/Icons';

import {
    colorIconShowAll,
    colorIconHideAll,
    colorSearchButton,
    colorAccentOrange,
    cnCol1FlexCol,
    cnColFieldGradient,
    cnMaxWidthCentered,
  } from "../components/Common";


// NOTE: to update JSON from SF directory, use the following
// python3 doc/build_json.py --write --output ../static-frame-www/site-static-frame/src/sf-api

import sigsInitial from '../sf-api/sigs.json';
import sigToDocJSON from '../sf-api/sig_to_doc.json';
import sigToExJSON from '../sf-api/sig_to_example.json';
import sigToGroupJSON from '../sf-api/sig_to_group.json';

import methodToSigJSON from '../sf-api/method_to_sig.json';
import sigFullToSigJSON from '../sf-api/sig_full_to_sig.json';
import metadataJSON from '../sf-api/metadata.json';

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

const CNTextSmall = "text-base text-zinc-500 font-sans"

const CNButtonCommon = "ml-1 my-1 p-2 w-8 rounded-sm"; // my-2 permits buttons to wrap in narrow views
const CNButton =`${CNButtonCommon} bg-gradient-to-b from-zinc-600 to-zinc-700`;
const CNButtonActive = `${CNButtonCommon} bg-gradient-to-b from-zinc-700 to-zinc-600`;

const CNButtonHover = "ml-1 my-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm text-base text-zinc-400 font-sans";

const CNToolTipLeft = "pointer-events-none absolute opacity-0 bg-slate-600 rounded-sm w-max p-2 -top-14 right-0 font-sans text-slate-100 text-right transition-opacity delay-500 group-hover:opacity-80"

const sigsEmpty: string[] = [];

//------------------------------------------------------------------------------

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

interface APISearchProps {
    initialQuery?: string;
}

export function APISearch({ initialQuery }: APISearchProps = {}) {
    //--------------------------------------------------------------------------
    // application state

    // sigsDisplay is used to populate the main list of signatures. Setting this updates the listed signatures.
    const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);

    // docDisplay, exDisplay, are Boolean mappings by signature used to indicate of docs / examples are displayed for a signature.
    const [docDisplay, setDocDisplay] = React.useState(new Map<string, boolean>());
    const [exDisplay, setExDisplay] = React.useState(new Map<string, boolean>());

    // Boolean flag to determine search configuration
    const [fullSigSearch, setFullSigSearch] = React.useState(false);
    const [reSearch, setRESearch] = React.useState(false);

    // Optional warning display
    const [warningMsg, setWarningMsg] = React.useState("");

    // Ref for uncontrolled input - typing causes zero re-renders
    const inputRef = React.useRef<HTMLInputElement>(null);
    const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

    // Search query state - only updated after debounce
    const [searchQuery, setSearchQuery] = React.useState((initialQuery || "").trim());

    // Handle input changes with debouncing - no state updates during typing
    const handleInputChange = React.useCallback(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            const value = (inputRef.current?.value || "").trim();
            setSearchQuery(value);
            if (value) {
                window.history.replaceState(
                    null,
                    "StaticFrame API Search",
                    `/search/${encodeURIComponent(value)}`);
            }
        }, 500);
    }, []);

    // Set initial value on mount
    React.useEffect(() => {
        if (inputRef.current && initialQuery) {
            inputRef.current.value = initialQuery;
        }
    }, [initialQuery]);

    // Helper to update input value programmatically and trigger search
    const setInputValue = React.useCallback((value: string) => {
        const trimmed = value.trim();
        if (inputRef.current) {
            inputRef.current.value = trimmed;
        }
        setSearchQuery(trimmed);
        if (trimmed) {
            window.history.replaceState(
                null,
                "StaticFrame API Search",
                `/search/${encodeURIComponent(trimmed)}`);
        }
    }, []);

    // Helper to clear input without triggering search (for filter buttons)
    const clearInputOnly = React.useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, []);


    //--------------------------------------------------------------------------

    // Return an li element for each value. Called once for each row after filtering. `value` is the sig
    function SignatureItem(value: string, index: number) {
        const className = value.split(".")[0];
        const groupName = sigToGroup.get(value);
        const sigFull = sigToSigFull.get(value);

        function onClickTagClass() {
            setFullSigSearch(false);
            setRESearch(false);
            const sigsFiltered: string[] = [];
            sigToGroup.forEach((_value, key) => {
                if (key.split('.')[0] === className) {
                        sigsFiltered.push(key);
                    }
                }
            )
            setSigsDisplay(sigsFiltered);
            clearInputOnly();
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
            clearInputOnly();
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

        const buttonLink = (
            <span className="group relative">
                <a
                    href={`/sig/${encodeURIComponent(value)}`}
                    aria-label="View signature details"
                    className={`${CNButtonHover} inline-flex items-center justify-center`}
                >
                    <IconLink fill={colorSearchButton} />
                </a>
                <span className={CNToolTipLeft}>View signature details</span>
            </span>
        );

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
                        <SigLabel sigFull={sigFull} />
                    </span>
                    <span className="w-2/6 text-right">
                        {buttonLink}
                        {buttonClass}
                        {buttonGroup}
                        {buttonDoc}
                        {buttonEx}
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
        (target: string) => {
        const lowerTarget = target.toLowerCase();
        if (!lowerTarget) {
            setSigsDisplay(sigsEmpty);
            return;
        }
        let sigsFiltered: string[] = [];
        // NOTE: we always filter the entire list, not the subset of what was previously filtered

        if (fullSigSearch) {
            if (reSearch) {
                const re = new RegExp(lowerTarget);
                sigFullToSig.forEach((value, key) => {
                    if (re.test(key.toLowerCase())) {
                        sigsFiltered.push(value);
                    }
                });
            }
            else {
                sigFullToSig.forEach((value, key) => {
                    if (key.toLowerCase().indexOf(lowerTarget) > -1) {
                        sigsFiltered.push(value);
                    }
                });
            }
        }
        else {
            if (reSearch) {
                const re = new RegExp(lowerTarget);
                sigsFiltered = sigsInitial.filter((row) => {
                    return re.test(row.toLowerCase());
                });
            }
            else {
                sigsFiltered = sigsInitial.filter((row) => {
                    return row.toLowerCase().indexOf(lowerTarget) > -1;
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
        // NOTE: setting sigsFiltered is faster than just calling setInputValue, which alone will work
        const sigsFiltered = methodToSig.get(key);
        if (sigsFiltered) {
            setSigsDisplay(sigsFiltered);
        }
        setInputValue(key);
    }

    function onClickExampleRandom() {
        setFullSigSearch(false); // key will be a sig w/o parameters
        setRESearch(false);

        const keys = Array.from(sigToEx.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        // NOTE: setting sigsFiltered is faster than just calling setInputValue, which alone will work
        setSigsDisplay([key]);
        setInputValue(key);
        exDisplay.set(key, true);
    }

    function onClickQueryClear() {
        setSigsDisplay(sigsEmpty); // always faster
        setInputValue("");
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
    // On search query changes, run the search
    React.useEffect(() => {
        searchSigs(searchQuery);
    }, [searchQuery, searchSigs]);

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
                ref={inputRef}
                aria-label="Search query"
                aria-required="true"
                defaultValue={initialQuery}
                onChange={handleInputChange}
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

export default function Home() {
    return (
    <div>
        <Header />
        <div className="h-screen overflow-x-auto">
            <div className="h-6"></div>
            <div className={cnMaxWidthCentered}>

                <div className="flex flex-wrap px-2 py-2 my-4 bg-black rounded-sm">
                    <div className={cnCol1FlexCol}>
                      <div className={cnColFieldGradient}>
                        <SFBanner />
                      </div>
                    </div>
                </div>

                <div className="flex flex-wrap px-2 pt-2 bg-black rounded-sm">
                    <div className={cnCol1FlexCol}>
                        <APISearch />
                    </div>
                </div>
                <Footer />

            </div>
        </div>
    </div>
    );
}
