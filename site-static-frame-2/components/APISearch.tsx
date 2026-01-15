"use client";

import React from "react";
import { SignatureItem } from "./SignatureItem";
import {
  IconDocument,
  IconCode,
  IconClear,
  IconParameters,
  IconRE,
  IconWarning,
} from "./Icons";
import {
  colorIconShowAll,
  colorIconHideAll,
  colorSearchButton,
  colorAccentOrange,
  CNButton,
  CNButtonActive,
  CNButtonHover,
  renderIconButton,
} from "./Common";

import {
  sigsInitial,
  sigToDoc,
  sigToEx,
  sigToGroup,
  methodToSig,
  sigToSigFull,
  versionAPI,
  sigsEmpty,
} from "../lib/apiData";

import { searchSignatures } from "../lib/search";

const CNTextSmall = "text-base text-zinc-500 font-sans";

interface APISearchProps {
  initialQuery?: string;
}

export function APISearch({ initialQuery }: APISearchProps = {}) {
  //--------------------------------------------------------------------------
  // application state

  // sigsDisplay is used to populate the main list of signatures. Setting this updates the listed signatures.
  const [sigsDisplay, setSigsDisplay] = React.useState(sigsEmpty);

  // docDisplay, exDisplay, are Boolean mappings by signature used to indicate of docs / examples are displayed for a signature.
  const [docDisplay, setDocDisplay] = React.useState(
    new Map<string, boolean>(),
  );
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
  const [searchQuery, setSearchQuery] = React.useState(
    (initialQuery || "").trim(),
  );

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
          `/search/${encodeURIComponent(value)}`,
        );
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
        `/search/${encodeURIComponent(trimmed)}`,
      );
    }
  }, []);

  // Helper to clear input without triggering search (for filter buttons)
  const clearInputOnly = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  //--------------------------------------------------------------------------

  // Given a target, filter all signatures and update the sigsDisplay state
  // On fullSigSearch, reSearch update, this is called, updating setSigsDisplay
  const searchSigs = React.useCallback(
    (target: string) => {
      if (!target.trim()) {
        setSigsDisplay(sigsEmpty);
        return;
      }
      const result = searchSignatures(target, { fullSigSearch, reSearch });
      setSigsDisplay(result.signatures);
    },
    [reSearch, fullSigSearch],
  );

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

  const onClickQueryClear = React.useCallback(() => {
    setSigsDisplay(sigsEmpty); // always faster
    setInputValue("");
  }, [setInputValue]);

  function onClickExampleShowAll() {
    if (sigsDisplay.length === 0) {
      setWarningMsg(
        "No signatures for which to display examples. Please enter a query.",
      );
    } else if (sigsDisplay.length > 100) {
      setWarningMsg(
        "Too many signatures to display all examples. Please narrow your search.",
      );
    } else {
      sigsDisplay.forEach((e) => exDisplay.set(e, true));
      setExDisplay(new Map<string, boolean>(exDisplay));
    }
  }

  function onClickExampleHideAll() {
    setExDisplay(new Map<string, boolean>());
  }

  function onClickDocShowAll() {
    if (sigsDisplay.length === 0) {
      setWarningMsg(
        "No signatures for which to display documentation. Please enter a query.",
      );
    } else if (sigsDisplay.length > 100) {
      setWarningMsg(
        "Too many signatures to display all documentation. Please narrow your search.",
      );
    } else {
      sigsDisplay.forEach((e) => docDisplay.set(e, true));
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
      return (
        <span className="pl-2">
          <span className={CNTextSmall}>
            {len} {len === 1 ? "Result" : "Results"}
          </span>
        </span>
      );
    }
    return <span className={CNTextSmall}>{"No Results"}</span>;
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
    );
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
        </div>
      );
    }
    return <div />;
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
  const buttonClear = renderIconButton(
    "Clear query",
    IconClear,
    colorSearchButton,
    onClickQueryClear, // eslint-disable-line react-hooks/refs
    () => CNButtonHover,
  );

  const buttonRe = renderIconButton(
    "Use regular expression",
    IconRE,
    colorSearchButton,
    onClickRESearch,
    () => (reSearch ? CNButtonActive : CNButton),
  );

  const buttonFullSig = renderIconButton(
    "Include parameter names",
    IconParameters,
    colorSearchButton,
    onClickFullSigSearch,
    () => (fullSigSearch ? CNButtonActive : CNButton),
  );

  const versionLink = (
    <a
      className="text-zinc-500"
      href={`https://pypi.org/project/static-frame/${versionAPI}/`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {versionAPI}
    </a>
  );

  return (
    <div className="space-y-2">
      <div className="px-2">
        <span className="text-2xl text-slate-400 text-bold">
          StaticFrame API Search
        </span>
      </div>
      <div className="px-2">
        <p className={CNTextSmall}>
          Search {sigsInitial.length.toLocaleString()} endpoints and view{" "}
          {sigToEx.size.toLocaleString()} code examples of the {versionLink}{" "}
          API.
        </p>
      </div>
      <div>
        <button
          onClick={onClickRandomMethod}
          aria-label="Random Method"
          className={CNButtonHover}
        >
          Random Method
        </button>
        <button
          onClick={onClickExampleRandom}
          aria-label="RandomExample"
          className={CNButtonHover}
        >
          Random Example
        </button>
      </div>
      {/*------------------------------------------------------------------*/}
      {/* NOTE: might make this a component, but trying to do so made text input unusable */}
      <div className="flex pr-2">
        <input
          type="text"
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
          {sigsDisplay.map((value, index) => (
            <SignatureItem
              key={value}
              value={value}
              index={index}
              sigToGroup={sigToGroup}
              sigToSigFull={sigToSigFull}
              sigToDoc={sigToDoc}
              sigToEx={sigToEx}
              docDisplay={docDisplay}
              exDisplay={exDisplay}
              setFullSigSearch={setFullSigSearch}
              setRESearch={setRESearch}
              setSigsDisplay={setSigsDisplay}
              setDocDisplay={setDocDisplay}
              setExDisplay={setExDisplay}
              clearInputOnly={clearInputOnly}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
